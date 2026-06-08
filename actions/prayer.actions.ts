"use server";

import dbConnect from "@/lib/mongodb";
import { Prayer } from "@/models";
import { prayerSchema } from "./schemas";
import type { ActionResult, PrayerData, PrayerHistoryData } from "./types";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/**
 * Obtiene la oración más recientemente actualizada.
 *
 * @returns La oración encontrada o `null` si no existe ninguna.
 */
export async function getPrayer(): Promise<ActionResult<PrayerData | null>> {
  try {
    await dbConnect();

    const prayer = await Prayer.findOne().sort({ updatedAt: -1 }).lean();

    if (!prayer) {
      return { success: true, data: null };
    }

    return {
      success: true,
      data: { title: prayer.title, text: prayer.text, reference: prayer.reference },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Obtiene el historial completo de oraciones, ordenadas por fecha descendente.
 *
 * @returns Una lista de oraciones.
 */
export async function getPrayerHistory(): Promise<ActionResult<PrayerHistoryData[]>> {
  try {
    await dbConnect();

    const prayers = await Prayer.find().sort({ updatedAt: -1 }).lean();

    const data: PrayerHistoryData[] = prayers.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      text: p.text,
      reference: p.reference,
      updatedAt: (p as any).updatedAt?.toISOString() || new Date().toISOString(),
    }));

    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Crea o actualiza una oración.
 *
 * Si ya existe una oración con el mismo texto (normalizado), la actualiza
 * en lugar de crear un duplicado — de lo contrario, crea una nueva.
 *
 * @param formData - FormData proveniente del formulario con los campos `text` y `reference`.
 * @returns Los datos de la oración guardada o un mensaje de error.
 */
export async function createPrayer(
  formData: FormData
): Promise<ActionResult<PrayerData>> {
  // 1. Validar campos
  const validated = prayerSchema.safeParse({
    title: formData.get("title") || undefined,
    text: formData.get("text"),
    reference: formData.get("reference") || undefined,
  });

  if (!validated.success) {
    const firstError = validated.error.issues[0]?.message ?? "Datos inválidos";
    return { success: false, error: firstError };
  }

  const { title, text, reference } = validated.data;

  try {
    await dbConnect();

    // 2. Normalizar el texto para buscar duplicados
    const normalizedNew = text.replace(/\s+/g, " ").trim().toUpperCase();

    const allPrayers = await Prayer.find().select("_id text").lean();
    const existing = allPrayers.find(
      (p) => p.text.replace(/\s+/g, " ").trim().toUpperCase() === normalizedNew
    );

    let prayer;
    if (existing) {
      // Actualizar la existente (mongoose actualizará updatedAt automáticamente)
      prayer = await Prayer.findByIdAndUpdate(
        existing._id,
        { title, text, reference },
        { new: true }
      );
    } else {
      // Crear una nueva
      prayer = await Prayer.create({ title, text, reference });
    }

    // Revalidar las rutas que dependen de la oración
    revalidatePath("/");
    revalidatePath("/admin");

    return {
      success: true,
      data: { title: prayer!.title, text: prayer!.text, reference: prayer!.reference },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Elimina una oración del historial.
 *
 * @param id - El ID de la oración a eliminar.
 */
export async function deletePrayer(id: string): Promise<ActionResult<null>> {
  try {
    await dbConnect();
    await Prayer.findByIdAndDelete(id);

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}
