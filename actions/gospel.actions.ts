"use server";

import dbConnect from "@/lib/mongodb";
import { Gospel } from "@/models";
import { gospelSchema } from "./schemas";
import type { ActionResult, GospelData, GospelHistoryData } from "./types";
import { revalidatePath } from "next/cache";

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

    const gospel = await Gospel.findOne().sort({ updatedAt: -1 }).lean();

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
 * Crea un nuevo registro de evangelio en el historial.
 *
 * @param formData - FormData proveniente del formulario con los campos `title` y `text`.
 * @returns Los datos del evangelio guardado o un mensaje de error.
 */
export async function createGospel(
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

    // 2. Normalizar el título para buscar duplicados (sin espacios y en mayúsculas)
    const normalizedNewTitle = title.replace(/\s+/g, '').toUpperCase();
    
    // Traer los títulos existentes para comparar
    const allGospels = await Gospel.find().select('_id title').lean();
    const existing = allGospels.find(
      (g) => g.title.replace(/\s+/g, '').toUpperCase() === normalizedNewTitle
    );

    let gospel;
    if (existing) {
      // Actualizar el existente (mongoose actualizará updatedAt automáticamente)
      gospel = await Gospel.findByIdAndUpdate(
        existing._id,
        { title, text },
        { new: true }
      );
    } else {
      // Crear uno nuevo
      gospel = await Gospel.create({ title, text });
    }

    revalidatePath("/");
    revalidatePath("/admin");

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
 * Obtiene el historial completo de evangelios, ordenados por fecha descendente.
 *
 * @returns Una lista de evangelios.
 */
export async function getGospelHistory(): Promise<ActionResult<GospelHistoryData[]>> {
  try {
    await dbConnect();

    const gospels = await Gospel.find().sort({ updatedAt: -1 }).lean();

    const data: GospelHistoryData[] = gospels.map((g) => ({
      id: g._id.toString(),
      title: g.title,
      text: g.text,
      createdAt: (g as any).updatedAt?.toISOString() || new Date().toISOString(),
    }));

    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Elimina un evangelio del historial.
 *
 * @param id - El ID del evangelio a eliminar.
 */
export async function deleteGospel(id: string): Promise<ActionResult<null>> {
  try {
    await dbConnect();
    await Gospel.findByIdAndDelete(id);

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Vuelve a publicar un evangelio del historial actualizando su fecha de creación.
 *
 * @param id - El ID del evangelio a volver a publicar.
 */
export async function republishGospel(id: string): Promise<ActionResult<null>> {
  try {
    await dbConnect();
    
    // Actualizamos updatedAt para que aparezca como el más reciente.
    await Gospel.findByIdAndUpdate(id, { updatedAt: new Date() });

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}
