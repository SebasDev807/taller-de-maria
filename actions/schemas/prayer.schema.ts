import { z } from "zod";

/** Esquema de validación para el formulario de la oración. */
export const prayerSchema = z.object({
  text: z
    .string({ error: "El texto de la oración es obligatorio" })
    .min(1, "El texto de la oración es obligatorio")
    .trim(),
  reference: z.string().trim().optional(),
});
