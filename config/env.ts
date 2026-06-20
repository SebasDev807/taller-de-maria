import { z } from "zod";

/**
 * Esquema de validación estricta para las variables de entorno utilizando Zod.
 * Garantiza que la aplicación no se inicie si faltan configuraciones críticas o si tienen un formato inválido.
 */
const envSchema = z.object({
  // Base de datos
  
  /**
   * Cadena de conexión para la base de datos MongoDB.
   * Debe incluir credenciales y el nombre de la base de datos.
   */
  MONGODB_URI: z
    .string({ error: "MONGODB_URI es requerida" })
    .min(1, "MONGODB_URI no puede estar vacía")
    .startsWith("mongodb", "MONGODB_URI debe ser una URI de MongoDB válida"),

  // Sesión JWT
  
  /**
   * Clave secreta utilizada para firmar y verificar tokens de sesión (JWT/Jose).
   * Se requiere que tenga al menos 32 caracteres de longitud por seguridad.
   */
  SESSION_SECRET: z
    .string({ error: "SESSION_SECRET es requerida" })
    .min(32, "SESSION_SECRET debe tener al menos 32 caracteres"),

  // Entorno de la aplicación
  
  /**
   * Entorno de ejecución de la aplicación.
   * Determina comportamientos específicos basados en si la app
   * está en desarrollo, producción o en pruebas.
   */
  NODE_ENV: z
    .enum(["development", "production", "test"], {
      error: "NODE_ENV debe ser 'development', 'production' o 'test'",
    })
    .default("development"),

  /**
   * Clave API para el servicio de envío de correos Resend.
   * Utilizada para enviar emails transaccionales y de verificación.
   */
  RESEND_API_KEY: z
    .string({ error: "RESEND_API_KEY es requerida" })
    .min(1, "RESEND_API_KEY no puede estar vacía"),

  /**
   * URL pública base de la aplicación.
   * Utilizada para generar enlaces absolutos en correos electrónicos
   * y otros servicios que requieran la URL completa del sitio.
   */
  NEXT_PUBLIC_APP_URL: z
    .string({ error: "NEXT_PUBLIC_APP_URL es requerida" })
    .url("NEXT_PUBLIC_APP_URL debe ser una URL válida"),

  // Cloudinary
  
  /**
   * Nombre de la nube en la cuenta de Cloudinary.
   * Es una variable pública que se usa en el cliente para subir y recuperar imágenes.
   */
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z
    .string({ error: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME es requerida" })
    .min(1, "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no puede estar vacía"),

  /**
   * Clave API para autenticarse con el servicio de Cloudinary desde el servidor.
   */
  CLOUDINARY_API_KEY: z
    .string({ error: "CLOUDINARY_API_KEY es requerida" })
    .min(1, "CLOUDINARY_API_KEY no puede estar vacía"),

  /**
   * Secreto de la API de Cloudinary para autenticación segura en el servidor.
   * Nunca debe ser expuesto al cliente.
   */
  CLOUDINARY_API_SECRET: z
    .string({ error: "CLOUDINARY_API_SECRET es requerida" })
    .min(1, "CLOUDINARY_API_SECRET no puede estar vacía"),

  /**
   * URL de conexión directa para el SDK de Cloudinary.
   * Debe seguir el formato cloudinary://...
   */
  CLOUDINARY_URL: z
    .string({ error: "CLOUDINARY_URL es requerida" })
    .startsWith("cloudinary://", "CLOUDINARY_URL debe empezar con cloudinary://"),
});

/**
 * Tipo de datos que representa el conjunto de variables de entorno disponibles y validadas.
 */
export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const tree = z.treeifyError(parsed.error);
  const messages = Object.entries(tree.properties ?? {})
    .map(([field, node]) => `  ✗ ${field}: ${node.errors.join(", ")}`)
    .join("\n");

  throw new Error(
    `❌ Variables de entorno inválidas:\n${messages}\n\nRevisa tu archivo .env.local`
  );
}

/**
 * Variables de entorno parseadas, validadas y fuertemente tipadas.
 * Úsalo en toda la aplicación en lugar de acceder a process.env directamente
 * para garantizar seguridad en tiempo de ejecución.
 */
export const env: Env = parsed.data;
