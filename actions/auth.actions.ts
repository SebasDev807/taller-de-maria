"use server";

import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models";
import { UserRole } from "@/models/user/user.interface";
import { comparePassword } from "@/helpers/password";
import { createSession, deleteSession } from "@/lib/session";
import { loginSchema } from "./schemas";
import type { AuthActionResult, SessionUser } from "./types";

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

    // Removed restriction to allow any user to log in

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
