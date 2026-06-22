import { z } from "zod";

export const aboutSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  history: z.string().min(1, "La historia es requerida"),
  address: z.string().min(1, "La dirección es requerida"),
  contact: z.string().min(1, "El contacto es requerido"),
  schedule: z.string().min(1, "El horario de atención es requerido"),
  pillars: z.array(
    z.object({
      icon: z.string().min(1, "El icono es requerido"),
      title: z.string().min(1, "El título es requerido"),
      description: z.string().min(1, "La descripción es requerida"),
    })
  ).min(1, "Debe haber al menos un pilar"),
});
