import { z } from "zod";

const envSchema = z.object({
  // Base de datos
  MONGODB_URI: z
    .string({ error: "MONGODB_URI es requerida" })
    .min(1, "MONGODB_URI no puede estar vacía")
    .startsWith("mongodb", "MONGODB_URI debe ser una URI de MongoDB válida"),

  // Entorno de la aplicación
  NODE_ENV: z
    .enum(["development", "production", "test"], {
      error: "NODE_ENV debe ser 'development', 'production' o 'test'",
    })
    .default("development"),
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
