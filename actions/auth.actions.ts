"use server";

import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models";
import { UserRole } from "@/models/user/user.interface";
import { comparePassword, hashPassword } from "@/helpers/password";
import { createSession, deleteSession } from "@/lib/session";
import { resend } from "@/lib/resend";
import { buildVerificationEmail } from "@/emails/verification-email";
import { loginSchema, registerSchema } from "./schemas";
import type { AuthActionResult, RegisterActionResult, SessionUser } from "./types";
import { env } from "@/config/env";

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/**
 * Registra un nuevo usuario, genera un token de verificación y envía
 * el email de confirmación con Resend.
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

    // 2. Verificar que el email no esté registrado
    const existing = await User.findOne({ email });
    if (existing) {
      return { success: false, error: "Ya existe una cuenta con ese correo." };
    }

    // 3. Hashear contraseña y generar token de verificación (UUID v4)
    const [hashedPassword, token] = await Promise.all([
      hashPassword(password),
      Promise.resolve(randomUUID()),
    ]);

    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    // 4. Crear usuario inactivo en la BD
    await User.create({
      name: name.trim(),
      email,
      password: hashedPassword,
      role: UserRole.User,
      phoneNumber: phoneNumber?.trim(),
      isActive: false,
      verificationToken: token,
      verificationTokenExpires: tokenExpires,
    });

    // 5. Construir URL y enviar email
    const verificationUrl = `${env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`;

    const { error: emailError } = await resend.emails.send({
      from: "Taller de María <noreply@tallerdmaria.com>",
      to: email,
      subject: "Confirma tu cuenta — Taller de María",
      html: buildVerificationEmail({ name, verificationUrl }),
    });

    if (emailError) {
      // El usuario fue creado pero el email falló: limpiar la BD
      await User.deleteOne({ email });
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
 * Retorna los datos del usuario en éxito, o un mensaje de error genérico.
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

    // 4. Comparar password con el hash usando helpers/password.ts
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return { success: false, error: "Credenciales inválidas" };
    }

    // 5. Verificar que la cuenta esté activada
    if (!user.isActive) {
      return {
        success: false,
        error:
          "Tu cuenta aún no ha sido confirmada. Revisa tu correo electrónico.",
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
 * Elimina la sesión y redirige al login.
 */
export async function logoutUser(): Promise<void> {
  await deleteSession();
  redirect("/");
}
