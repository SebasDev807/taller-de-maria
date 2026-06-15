"use server";

import dbConnect from "@/lib/mongodb";
import { SavedReading } from "@/models";
import { getSession } from "@/lib/session";
import type { ActionResult } from "./types/shared.types";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/helpers/generate-slug";

export interface SaveReadingInput {
  title?: string;
  text: string;
  reference?: string;
  type: "prayer" | "gospel";
}

/**
 * Guarda una oración o evangelio para el usuario actual.
 */
export async function saveReading(
  data: SaveReadingInput
): Promise<ActionResult<{ isSaved: boolean }>> {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return { success: false, error: "Debes iniciar sesión para guardar." };
    }

    await dbConnect();

    // Check if it already exists
    const existing = await SavedReading.findOne({
      userId: session.userId,
      text: data.text,
      type: data.type,
    });

    if (existing) {
      return { success: true, data: { isSaved: true } };
    }

    const baseText = data.title || data.reference || (data.type === 'gospel' ? 'Evangelio' : 'Oracion');
    const slug = generateSlug(baseText);

    await SavedReading.create({
      userId: session.userId,
      slug,
      title: data.title,
      text: data.text,
      reference: data.reference,
      type: data.type,
    });

    revalidatePath("/");
    
    return { success: true, data: { isSaved: true } };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado al guardar.";
    return { success: false, error: message };
  }
}

/**
 * Elimina una lectura guardada para el usuario actual basándose en el texto.
 */
export async function unsaveReading(text: string, type: "prayer" | "gospel"): Promise<ActionResult<{ isSaved: boolean }>> {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return { success: false, error: "Debes iniciar sesión para realizar esta acción." };
    }

    await dbConnect();

    await SavedReading.findOneAndDelete({
      userId: session.userId,
      text,
      type,
    });

    revalidatePath("/");

    return { success: true, data: { isSaved: false } };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Verifica si una lectura específica está guardada por el usuario actual.
 */
export async function checkReadingSaved(text: string, type: "prayer" | "gospel"): Promise<boolean> {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return false;
    }

    await dbConnect();

    const existing = await SavedReading.findOne({
      userId: session.userId,
      text,
      type,
    }).lean();

    return !!existing;
  } catch {
    return false;
  }
}

/**
 * Obtiene todas las lecturas guardadas por el usuario actual.
 */
export async function getSavedReadings(): Promise<ActionResult<any[]>> {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return { success: false, error: "Debes iniciar sesión para ver tus lecturas." };
    }

    await dbConnect();

    const readings = await SavedReading.find({
      userId: session.userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    // Convert _id and userId to string if needed to pass to Client Components
    const serializedReadings = readings.map((r: any) => ({
      ...r,
      _id: r._id.toString(),
      userId: r.userId.toString(),
      createdAt: r.createdAt?.toISOString(),
      updatedAt: r.updatedAt?.toISOString(),
    }));

    return { success: true, data: serializedReadings };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al obtener lecturas.";
    return { success: false, error: message };
  }
}

/**
 * Obtiene una lectura guardada por su slug y valida que pertenezca al usuario actual.
 */
export async function getReadingBySlug(slug: string): Promise<ActionResult<any>> {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return { success: false, error: "Debes iniciar sesión." };
    }

    await dbConnect();

    const reading = await SavedReading.findOne({
      userId: session.userId,
      slug,
    }).lean();

    if (!reading) {
      return { success: false, error: "Lectura no encontrada." };
    }

    const serializedReading = {
      ...reading,
      _id: (reading as any)._id.toString(),
      userId: (reading as any).userId.toString(),
      createdAt: (reading as any).createdAt?.toISOString(),
      updatedAt: (reading as any).updatedAt?.toISOString(),
    };

    return { success: true, data: serializedReading };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al obtener la lectura.";
    return { success: false, error: message };
  }
}
