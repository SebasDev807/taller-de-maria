"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models";
import { UserRole } from "@/models/user/user.interface";
import { comparePassword } from "@/helpers/password";
import { createSession, deleteSession } from "@/lib/session";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type AuthActionResult =
  | { success: true; data: SessionUser }
  | { success: false; error: string };

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const loginSchema = z.object({
  email: z
    .string({ error: "El email es obligatorio" })
    .email("Ingresa un email válido")
    .trim()
    .toLowerCase(),
  password: z
    .string({ error: "La contraseña es obligatoria" })
    .min(1, "La contraseña es obligatoria"),
});

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/**
 * Verifica credenciales contra la BD y crea una sesión JWT en cookie.
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

    // 5. Solo usuarios admin pueden acceder al panel
    if (user.role !== UserRole.Admin) {
      return {
        success: false,
        error: "No tienes permisos para acceder al panel de administración",
      };
    }

    const sessionUser: SessionUser = {
      id: user._id!.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // 6. Crear sesión JWT en cookie HttpOnly
    await createSession({ userId: sessionUser.id, name: sessionUser.name, email: sessionUser.email, role: sessionUser.role });

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
  redirect("/auth/login");
}
