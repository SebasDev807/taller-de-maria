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

/** Esquema de validación para el formulario de registro. */
export const registerSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres").trim(),
  email: z.email("El correo es obligatorio").trim().toLowerCase(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  phoneNumber: z.string().min(10, "El teléfono debe tener al menos 10 dígitos").optional(),
});
