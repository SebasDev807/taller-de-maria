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
