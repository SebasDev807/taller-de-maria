import { generateSlug } from "./generate-slug";

/**
 * Genera un SKU (Stock Keeping Unit) único para un producto basado en su nombre
 * y una marca de tiempo aleatoria corta.
 * 
 * Utiliza `generateSlug` para normalizar el nombre del producto (sin espacios ni acentos),
 * convierte el resultado a mayúsculas y le añade un sufijo numérico único.
 *
 * @param {string} productName - El nombre original del producto.
 * @returns {string} El SKU generado (ej. ANILLO-DE-ORO-1A2B3C).
 */
export const generateSku = (productName: string): string => {
  if (!productName) return "";

  // Tomamos las primeras palabras (o partes del slug) para evitar SKUs muy largos
  const baseSlug = generateSlug(productName).toUpperCase();
  const shortBase = baseSlug.split("-").slice(0, 3).join("-");

  // Generamos una cadena aleatoria de 6 caracteres alfanuméricos
  const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `${shortBase}-${uniqueId}`;
};
