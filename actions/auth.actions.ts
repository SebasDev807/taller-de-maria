"use server";

import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import dbConnect from "@/lib/mongodb";
import { User, VerificationToken } from "@/models";
import { UserRole } from "@/models/user/user.interface";
import { comparePassword, hashPassword } from "@/helpers/password";
import { createSession, deleteSession } from "@/lib/session";
import { resend } from "@/lib/resend";
import { buildVerificationEmail } from "@/emails/verification-email";
import { loginSchema, registerSchema } from "./schemas";
import type { AuthActionResult, RegisterActionResult, SessionUser } from "./types";
import { env } from "@/config/env";

// ---------------------------------------------------------------------------
// Helpers internos
// ---------------------------------------------------------------------------

/** Genera un token de verificación y lo persiste en la colección VerificationToken. */
async function upsertVerificationToken(userId: string): Promise<string> {
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

  // findOneAndUpdate con upsert: crea si no existe, reemplaza si ya existe (1:1)
  await VerificationToken.findOneAndUpdate(
    { userId },
    { token, expiresAt },
    { upsert: true, new: true }
  );

  return token;
}

/** Construye la URL del email y envía el correo de verificación. */
async function sendVerificationEmail(params: {
  name: string;
  email: string;
  token: string;
}): Promise<boolean> {
  const verificationUrl = `${env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${params.token}`;

  const { error } = await resend.emails.send({
    from: "Taller de María <hola@tallerdemaria.com>",
    to: params.email,
    subject: "Confirma tu cuenta — Taller de María",
    html: buildVerificationEmail({ name: params.name, verificationUrl }),
  });

  return !error;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/**
 * Registra un nuevo usuario, genera un token de verificación en su propio
 * documento (relación 1:1) y envía el email de confirmación con Resend.
 */
export async function registerUser(
  formData: FormData
): Promise<RegisterActionResult> {
  // 1. Validar campos
  const validated = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phoneNumber: formData.get("phoneNumber") || undefined,
  });

  if (!validated.success) {
    const firstError = validated.error.issues[0]?.message ?? "Datos inválidos";
    return { success: false, error: firstError };
  }

  const { name, email, password, phoneNumber } = validated.data;

  try {
    await dbConnect();

    // 2. Verificar si ya existe un usuario con ese email
    const existing = await User.findOne({ email });

    if (existing) {
      // Cuenta ya activa → bloquear
      if (existing.isActive) {
        return { success: false, error: "Ya existe una cuenta activa con ese correo." };
      }

      // Cuenta inactiva (registro previo sin confirmar) → renovar token y reenviar email
      const token = await upsertVerificationToken(existing._id!.toString());
      const sent = await sendVerificationEmail({ name: existing.name, email, token });

      if (!sent) {
        return {
          success: false,
          error: "No pudimos enviar el email de verificación. Intenta de nuevo.",
        };
      }

      return { success: true, email };
    }

    // 3. Hashear contraseña
    const hashedPassword = await hashPassword(password);

    // 4. Crear usuario inactivo
    const user = await User.create({
      name: name.trim(),
      email,
      password: hashedPassword,
      role: UserRole.User,
      phoneNumber: phoneNumber?.trim(),
      isActive: false,
    });

    // 5. Crear token de verificación en su propio documento (1:1 con User)
    const token = await upsertVerificationToken(user._id.toString());

    // 6. Enviar email
    const sent = await sendVerificationEmail({ name, email, token });

    if (!sent) {
      // Email falló: limpiar usuario y token
      await Promise.all([
        User.deleteOne({ _id: user._id }),
        VerificationToken.deleteOne({ userId: user._id }),
      ]);
      return {
        success: false,
        error: "No pudimos enviar el email de verificación. Intenta de nuevo.",
      };
    }

    return { success: true, email };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Verifica credenciales contra la BD y crea una sesión JWT en cookie.
 * Bloquea el acceso si la cuenta aún no ha sido confirmada por email.
 */
export async function loginUser(
  formData: FormData
): Promise<AuthActionResult> {
  // 1. Validar campos
  const validated = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    const firstError = validated.error.issues[0]?.message ?? "Datos inválidos";
    return { success: false, error: firstError };
  }

  const { email, password } = validated.data;

  try {
    await dbConnect();

    // 2. Buscar usuario en la BD
    const user = await User.findOne({ email }).select("+password").lean();

    // 3. Error genérico (no revelar si el email existe o no)
    if (!user) {
      return { success: false, error: "Credenciales inválidas" };
    }

    // 4. Comparar password con el hash
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return { success: false, error: "Credenciales inválidas" };
    }

    // 5. Verificar que la cuenta esté activada
    if (!user.isActive) {
      return {
        success: false,
        error: "Tu cuenta aún no ha sido confirmada. Revisa tu correo electrónico.",
      };
    }

    const sessionUser: SessionUser = {
      id: user._id!.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // 6. Crear sesión JWT en cookie HttpOnly
    await createSession({
      userId: sessionUser.id,
      name: sessionUser.name,
      email: sessionUser.email,
      role: sessionUser.role,
    });

    return { success: true, data: sessionUser };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado";
    return { success: false, error: message };
  }
}

/**
 * Elimina la sesión y redirige al inicio.
 */
export async function logoutUser(): Promise<void> {
  await deleteSession();
  redirect("/");
}
