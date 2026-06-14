import { Types } from "mongoose";

export interface SerializedProduct {
  id: string; // mapped from _id or slug
  slug: string;
  sku: string;
  name: string;
  price: number;
  description?: string;
  stock: number;
  imageUrls: string[];
  category: string; // mapped from populated category or just id
  features: string[];
  tags: string[];
  badge?: string; // Derived from tags if available
  isFeatured?: boolean; // Derived from tags
  icon?: string; // Mapped if available
}

export const mapToSerializedProduct = (product: any): SerializedProduct => {
  // Maneja de forma segura el caso de que la categoría esté populada o no
  const categoryName = product.category && product.category.name 
    ? product.category.name 
    : (product.category ? product.category.toString() : 'Uncategorized');

  // Deriva badge de las tags si existen
  let badge: string | undefined = undefined;
  if (product.tags && product.tags.length > 0) {
    badge = product.tags[0];
  }

  // Deriva isFeatured de las tags
  const isFeatured = product.tags ? product.tags.includes("featured") || product.tags.includes("Destacado") : false;

  return {
    id: product._id ? product._id.toString() : '',
    slug: product.slug || '',
    sku: product.sku || '',
    name: product.name || '',
    price: product.price || 0,
    description: product.description || '',
    stock: product.stock || 0,
    imageUrls: product.imageUrls || [],
    category: categoryName,
    features: product.features || [],
    tags: product.tags || [],
    badge,
    isFeatured,
  };
};
