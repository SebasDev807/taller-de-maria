import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  sku: z.string().min(1, "El SKU es obligatorio"),
  slug: z.string().min(1, "El slug es obligatorio"),
  price: z.coerce.number().min(0, "El precio no puede ser negativo"),
  description: z.string().optional(),
  stock: z.coerce.number().min(0, "El stock no puede ser negativo"),
  imageUrls: z.array(z.string()).default([]),
  category: z.string().min(1, "La categoría es obligatoria"),
  features: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

export type ProductFormData = z.infer<typeof productSchema>;
