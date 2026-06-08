import { z } from "zod";

/** Esquema de validación para el formulario del evangelio. */
export const gospelSchema = z.object({
  title: z
    .string({ error: "El título es obligatorio" })
    .min(1, "El título es obligatorio")
    .trim(),
  text: z
    .string({ error: "El texto del evangelio es obligatorio" })
    .min(1, "El texto del evangelio es obligatorio")
    .trim(),
  reference: z.string().trim().optional(),
});
