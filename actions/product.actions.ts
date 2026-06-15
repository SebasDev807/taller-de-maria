"use server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/product/product.model";
import { SerializedProduct, mapToSerializedProduct } from "./types/product.types";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

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

import { productSchema } from "./schemas";
import type { ActionResult } from "./types";
import { generateSlug, generateSku } from "@/helpers";

/**
 * Crea un nuevo producto.
 * 
 * @param formData - FormData proveniente del formulario de creación.
 * @returns Los datos del producto guardado o un mensaje de error.
 */
export async function createProduct(formData: FormData): Promise<ActionResult<SerializedProduct>> {
  try {
    const rawName = formData.get("name") as string || "";
    const name = rawName.trim();
    const description = formData.get("description") as string || "";
    const price = Number(formData.get("price") || 0);
    const stock = Number(formData.get("stock") || 0);
    const category = formData.get("category") as string || "";

    // Parse features and imageUrls
    const featuresRaw = formData.get("features") as string;
    const features = featuresRaw ? JSON.parse(featuresRaw) : [];

    const imageUrlsRaw = formData.get("imageUrls") as string;
    const imageUrls = imageUrlsRaw ? JSON.parse(imageUrlsRaw) : [];

    const slug = generateSlug(name);
    const sku = generateSku(name);

    const validated = productSchema.safeParse({
      name,
      sku,
      slug,
      price,
      description,
      stock,
      imageUrls,
      category,
      features,
      tags: [],
    });

    if (!validated.success) {
      const firstError = validated.error.issues[0]?.message ?? "Datos inválidos";
      return { success: false, error: firstError };
    }

    await dbConnect();

    // Check for duplicates
    const existing = await Product.findOne({
      $or: [
        { name: validated.data.name },
        { slug: validated.data.slug },
        { sku: validated.data.sku }
      ]
    }).lean();

    if (existing) {
      return { success: false, error: "Ya existe un producto con ese nombre o SKU." };
    }

    const product = await Product.create(validated.data);

    revalidatePath("/admin");
    revalidatePath("/admin/inventario");
    revalidatePath("/catalog");

    return {
      success: true,
      data: mapToSerializedProduct(product),
    };
  } catch (error) {
    console.error("Error creating product:", error);
    const message = error instanceof Error ? error.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Recupera productos paginados con poblamiento opcional de categoría.
 * 
 * @param {number} page - Número de página actual (1 indexado).
 * @param {number} limit - Cantidad de productos por página.
 */
export async function getPaginatedProducts(page: number = 1, limit: number = 10): Promise<{
  products: SerializedProduct[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}> {
  try {
    await dbConnect();
    const skip = (page - 1) * limit;

    const [products, totalCount] = await Promise.all([
      Product.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category")
        .lean(),
      Product.countDocuments({})
    ]);

    const totalPages = Math.ceil(totalCount / limit) || 1;

    return {
      products: products.map(mapToSerializedProduct),
      totalPages,
      currentPage: page,
      totalCount
    };
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    return {
      products: [],
      totalPages: 1,
      currentPage: 1,
      totalCount: 0
    };
  }
}

/**
 * Elimina un producto por su ID.
 * 
 * @param {string} id - El ID del producto a eliminar.
 * @returns {Promise<ActionResult<boolean>>} El resultado de la operación.
 */
export async function deleteProduct(id: string): Promise<ActionResult<boolean>> {
  try {
    await dbConnect();
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return { success: false, error: "Producto no encontrado." };
    }

    // Delete images from Cloudinary
    if (result.imageUrls && result.imageUrls.length > 0) {
      for (const url of result.imageUrls) {
        try {
          const urlParts = url.split('/');
          const uploadIndex = urlParts.findIndex((part: string) => part === 'upload');

          if (uploadIndex !== -1) {
            let startIndex = uploadIndex + 1;
            if (urlParts[startIndex].match(/^v\d+$/)) {
              startIndex++;
            }

            const publicIdWithExtension = urlParts.slice(startIndex).join('/');
            const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));

            if (publicId) {
              await cloudinary.uploader.destroy(publicId);
            }
          }
        } catch (imgError) {
          console.error("Error deleting image from Cloudinary:", url, imgError);
        }
      }
    }

    revalidatePath("/admin");
    revalidatePath("/admin/inventario");
    revalidatePath("/catalog");

    return {
      success: true,
      data: true,
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    const message = error instanceof Error ? error.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Actualiza un producto existente.
 * 
 * @param {string} id - ID del producto a actualizar
 * @param {FormData} formData - FormData proveniente del formulario de edición.
 * @returns {Promise<ActionResult<SerializedProduct>>} Los datos del producto actualizado o un mensaje de error.
 */
export async function updateProduct(id: string, formData: FormData): Promise<ActionResult<SerializedProduct>> {
  try {
    const rawName = formData.get("name") as string || "";
    const name = rawName.trim();
    const description = formData.get("description") as string || "";
    const price = Number(formData.get("price") || 0);
    const stock = Number(formData.get("stock") || 0);
    const category = formData.get("category") as string || "";

    const featuresRaw = formData.get("features") as string;
    const features = featuresRaw ? JSON.parse(featuresRaw) : [];

    const imageUrlsRaw = formData.get("imageUrls") as string;
    const imageUrls = imageUrlsRaw ? JSON.parse(imageUrlsRaw) : [];

    const slug = generateSlug(name);
    const sku = generateSku(name);

    await dbConnect();

    const existingProduct = await Product.findById(id).lean();
    if (!existingProduct) {
      return { success: false, error: "Producto no encontrado." };
    }

    const tags = existingProduct.tags || [];

    const validated = productSchema.safeParse({
      name,
      sku,
      slug,
      price,
      description,
      stock,
      imageUrls,
      category,
      features,
      tags,
    });

    if (!validated.success) {
      const firstError = validated.error.issues[0]?.message ?? "Datos inválidos";
      return { success: false, error: firstError };
    }

    // Check for duplicates with different ID
    const duplicate = await Product.findOne({
      _id: { $ne: id },
      $or: [
        { name: validated.data.name },
        { slug: validated.data.slug },
        { sku: validated.data.sku }
      ]
    }).lean();

    if (duplicate) {
      return { success: false, error: "Ya existe otro producto con ese nombre o SKU." };
    }

    const product = await Product.findByIdAndUpdate(
      id,
      validated.data,
      { new: true }
    );

    revalidatePath("/admin");
    revalidatePath("/admin/inventory");
    revalidatePath(`/admin/inventory/${slug}`);
    revalidatePath("/catalog");
    revalidatePath(`/catalog/${slug}`);

    return {
      success: true,
      data: mapToSerializedProduct(product),
    };
  } catch (error) {
    console.error("Error updating product:", error);
    const message = error instanceof Error ? error.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

