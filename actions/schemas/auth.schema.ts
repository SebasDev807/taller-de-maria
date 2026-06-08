import { z } from "zod";

/** Esquema de validación para el formulario de inicio de sesión. */
export const loginSchema = z.object({
  email: z
    .email("El correo es obligatorio")
    .trim()
    .toLowerCase(),
  password: z.string()
    .min(1, "La contraseña es obligatoria"),
});


