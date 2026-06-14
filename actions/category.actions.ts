"use server";

import dbConnect from "@/lib/mongodb";
import { Category } from "@/models";
import { categorySchema } from "./schemas";
import type { ActionResult } from "./types";
import type { CategoryData } from "./types";
import { revalidatePath } from "next/cache";

/**
 * Crea una nueva categoría.
 *
 * @param formData - FormData proveniente del formulario con los campos `name` y `slug`.
 * @returns Los datos de la categoría guardada o un mensaje de error.
 */
export async function createCategory(
  formData: FormData
): Promise<ActionResult<CategoryData>> {
  const validated = categorySchema.safeParse({
    name: formData.get("name") || "",
    slug: formData.get("slug") || "",
  });

  if (!validated.success) {
    const firstError = validated.error.issues[0]?.message ?? "Datos inválidos";
    return { success: false, error: firstError };
  }

  const { name, slug } = validated.data;

  try {
    await dbConnect();

    // Buscar duplicados
    const existing = await Category.findOne({ slug }).lean();
    if (existing) {
      return { success: false, error: "Ya existe una categoría con este slug." };
    }

    const category = await Category.create({ name, slug });

    revalidatePath("/admin/inventario");
    revalidatePath("/catalog");

    return {
      success: true,
      data: {
        id: category._id.toString(),
        name: category.name,
        slug: category.slug,
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Elimina una categoría.
 *
 * @param id - El ID de la categoría a eliminar.
 */
export async function deleteCategory(id: string): Promise<ActionResult<null>> {
  try {
    await dbConnect();
    await Category.findByIdAndDelete(id);

    revalidatePath("/admin/inventario");
    revalidatePath("/catalog");

    return { success: true, data: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Obtiene una categoría por su slug.
 *
 * @param slug - El slug de la categoría.
 * @returns La categoría o null si no se encuentra.
 */
export async function getCategoryBySlug(slug: string): Promise<ActionResult<CategoryData | null>> {
  try {
    await dbConnect();
    const category = await Category.findOne({ slug }).lean();

    if (!category) {
      return { success: true, data: null };
    }

    return {
      success: true,
      data: {
        id: category._id.toString(),
        name: category.name,
        slug: category.slug,
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Obtiene todas las categorías.
 *
 * @returns Una lista de categorías.
 */
export async function getCategories(): Promise<ActionResult<CategoryData[]>> {
  try {
    await dbConnect();
    const categories = await Category.find().sort({ name: 1 }).lean();

    const data: CategoryData[] = categories.map((c) => ({
      id: c._id.toString(),
      name: c.name,
      slug: c.slug,
      createdAt: (c as any).createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: (c as any).updatedAt?.toISOString() || new Date().toISOString(),
    }));

    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}
