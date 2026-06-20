import { UserRole } from "@/models/user/user.interface";

/** Datos del usuario almacenados en la sesión JWT. */
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/** Resultado específico de las acciones de autenticación. */
export type AuthActionResult =
  | { success: true; data: SessionUser }
  | { success: false; error: string };

/** Resultado de la acción de registro con envío de email. */
export type RegisterActionResult =
  | { success: true; email: string }
  | { success: false; error: string };
