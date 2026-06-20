import { z } from "zod";

const envSchema = z.object({
  // Base de datos
  MONGODB_URI: z
    .string({ error: "MONGODB_URI es requerida" })
    .min(1, "MONGODB_URI no puede estar vacía")
    .startsWith("mongodb", "MONGODB_URI debe ser una URI de MongoDB válida"),

  // Sesión JWT
  SESSION_SECRET: z
    .string({ error: "SESSION_SECRET es requerida" })
    .min(32, "SESSION_SECRET debe tener al menos 32 caracteres"),

  // Entorno de la aplicación
  NODE_ENV: z
    .enum(["development", "production", "test"], {
      error: "NODE_ENV debe ser 'development', 'production' o 'test'",
    })
    .default("development"),
  RESEND_API_KEY: z
    .string({ error: "RESEND_API_KEY es requerida" })
    .min(1, "RESEND_API_KEY no puede estar vacía"),
  NEXT_PUBLIC_APP_URL: z
    .string({ error: "NEXT_PUBLIC_APP_URL es requerida" })
    .url("NEXT_PUBLIC_APP_URL debe ser una URL válida"),

  // Cloudinary
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z
    .string({ error: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME es requerida" })
    .min(1, "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no puede estar vacía"),
  CLOUDINARY_API_KEY: z
    .string({ error: "CLOUDINARY_API_KEY es requerida" })
    .min(1, "CLOUDINARY_API_KEY no puede estar vacía"),
  CLOUDINARY_API_SECRET: z
    .string({ error: "CLOUDINARY_API_SECRET es requerida" })
    .min(1, "CLOUDINARY_API_SECRET no puede estar vacía"),
  CLOUDINARY_URL: z
    .string({ error: "CLOUDINARY_URL es requerida" })
    .startsWith("cloudinary://", "CLOUDINARY_URL debe empezar con cloudinary://"),
});

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

export const env: Env = parsed.data;
