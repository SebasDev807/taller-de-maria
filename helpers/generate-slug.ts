/**
 * Crea un slug a partir de un texto.
 * Transforma el texto a minúsculas, elimina tildes/acentos, 
 * elimina caracteres especiales y reemplaza los espacios por guiones bajos.
 *
 * @param text - El texto original a transformar.
 * @returns El slug generado.
 */
export const generateSlug = (text: string): string => {
  return text
    .normalize("NFD") // Descompone caracteres con acentos
    .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres especiales que no sean alfanuméricos, espacios o guiones
    .replace(/\s+/g, "_"); // Reemplaza espacios por guiones bajos
};
