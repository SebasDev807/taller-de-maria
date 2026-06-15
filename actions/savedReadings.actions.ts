"use server";

import dbConnect from "@/lib/mongodb";
import { SavedReading } from "@/models";
import { getSession } from "@/lib/session";
import type { ActionResult } from "./types/shared.types";
import { revalidatePath } from "next/cache";

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

    await SavedReading.create({
      userId: session.userId,
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
