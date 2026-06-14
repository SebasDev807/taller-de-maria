"use server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/product/product.model";
import { SerializedProduct, mapToSerializedProduct } from "./types/product.types";
import { revalidatePath } from "next/cache";

/**
 * Recupera todos los productos, con poblamiento opcional de categoría.
 * 
 * @returns {Promise<SerializedProduct[]>} Lista de productos.
 */
export async function getProducts(): Promise<SerializedProduct[]> {
  try {
    await dbConnect();
    const products = await Product.find({}).populate("category").lean();
    return products.map(mapToSerializedProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Recupera un producto específico por su slug.
 * 
 * @param {string} slug - El slug del producto.
 * @returns {Promise<SerializedProduct | null>} El producto o null si no se encuentra.
 */
export async function getProductBySlug(slug: string): Promise<SerializedProduct | null> {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).populate("category").lean();
    
    if (!product) {
      return null;
    }
    
    return mapToSerializedProduct(product);
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Recupera los productos destacados.
 * 
 * @param {number} limit - Límite de productos a retornar (por defecto 3).
 * @returns {Promise<SerializedProduct[]>} Lista de productos destacados.
 */
export async function getFeaturedProducts(limit: number = 3): Promise<SerializedProduct[]> {
  try {
    await dbConnect();
    // Podemos buscar productos con la etiqueta "destacado" o simplemente tomar los últimos
    const products = await Product.find({ tags: { $in: ["Destacado", "featured"] } })
      .limit(limit)
      .populate("category")
      .lean();
      
    // Si no hay destacados explícitos, devolver los más recientes
    if (products.length === 0) {
      const recentProducts = await Product.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("category")
        .lean();
      return recentProducts.map(mapToSerializedProduct);
    }
    
    return products.map(mapToSerializedProduct);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

/**
 * Recupera productos relacionados a uno actual, usualmente por categoría o tags.
 * 
 * @param {string} currentProductId - ID del producto actual a excluir.
 * @param {number} limit - Cantidad máxima de productos (por defecto 4).
 * @returns {Promise<SerializedProduct[]>} Lista de productos relacionados.
 */
export async function getRelatedProducts(currentProductId: string, limit: number = 4): Promise<SerializedProduct[]> {
  try {
    await dbConnect();
    // Obtener productos aleatorios excluyendo el actual, en el futuro se puede refinar por categoría
    const products = await Product.find({ _id: { $ne: currentProductId } })
      .limit(limit)
      .populate("category")
      .lean();
      
    return products.map(mapToSerializedProduct);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}
