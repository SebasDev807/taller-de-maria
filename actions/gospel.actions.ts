"use server";

import dbConnect from "@/lib/mongodb";
import { Gospel } from "@/models";
import { gospelSchema } from "./schemas";
import type { ActionResult, GospelData } from "./types";

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/**
 * Obtiene el evangelio más reciente de la base de datos.
 *
 * @returns El evangelio encontrado o `null` si no existe ninguno.
 */
export async function getGospel(): Promise<ActionResult<GospelData | null>> {
  try {
    await dbConnect();

    const gospel = await Gospel.findOne().sort({ createdAt: -1 }).lean();

    if (!gospel) {
      return { success: true, data: null };
    }

    return {
      success: true,
      data: { title: gospel.title, text: gospel.text },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Crea o actualiza el evangelio del día.
 * Usa `findOneAndUpdate` con `upsert: true` para garantizar un único documento.
 *
 * @param formData - FormData proveniente del formulario con los campos `title` y `text`.
 * @returns Los datos del evangelio guardado o un mensaje de error.
 */
export async function upsertGospel(
  formData: FormData
): Promise<ActionResult<GospelData>> {
  // 1. Validar campos
  const validated = gospelSchema.safeParse({
    title: formData.get("title"),
    text: formData.get("text"),
  });

  if (!validated.success) {
    const firstError = validated.error.issues[0]?.message ?? "Datos inválidos";
    return { success: false, error: firstError };
  }

  const { title, text } = validated.data;

  try {
    await dbConnect();

    // 2. Actualizar el documento más reciente o crear uno nuevo
    const gospel = await Gospel.findOneAndUpdate(
      {},
      { title, text },
      { upsert: true, new: true, sort: { createdAt: -1 } }
    ).lean();

    return {
      success: true,
      data: { title: gospel!.title, text: gospel!.text },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}
