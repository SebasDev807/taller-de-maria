import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { generateSlug } from "@/helpers";

/**
 * Manejador de la ruta API para subir imágenes a Cloudinary.
 * 
 * Extrae un archivo de la petición (bajo el campo "file"), lo convierte a un 
 * buffer, y realiza una subida mediante stream hacia la carpeta de productos en Cloudinary.
 * 
 * @param request - El objeto de petición entrante (`NextRequest`) de Next.js.
 * @returns Un `NextResponse` con los datos de Cloudinary en caso de éxito, o 
 * un mensaje de error en formato JSON si ocurre un fallo o el archivo falta.
 * 
 * @example
 * ```typescript
 * const formData = new FormData();
 * formData.append("file", fileObject);
 * 
 * const res = await fetch("/api/upload", { method: "POST", body: formData });
 * const data = await res.json();
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string || "";

    if (!file) {
      return NextResponse.json(
        { error: "No se encontró ningún archivo en la petición" },
        { status: 400 }
      );
    }

    const slug = name ? generateSlug(name) : "general";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subimos la imagen a Cloudinary usando upload_stream
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `taller_de_maria/products/${slug}`,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al subir la imagen a Cloudinary:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al subir la imagen" },
      { status: 500 }
    );
  }
}
