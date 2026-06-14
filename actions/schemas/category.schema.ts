import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "El nombre de la categoría es obligatorio").trim(),
  slug: z.string().min(1, "El slug es obligatorio").trim().toLowerCase(),
});
