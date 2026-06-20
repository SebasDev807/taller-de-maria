import { z } from "zod";

export const aboutSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  history: z.string().min(1, "La historia es requerida"),
  address: z.string().min(1, "La dirección es requerida"),
  contact: z.string().min(1, "El contacto es requerido"),
  schedule: z.string().min(1, "El horario de atención es requerido"),
  pillars: z.array(z.string()).min(1, "Debe haber al menos un pilar"),
});
