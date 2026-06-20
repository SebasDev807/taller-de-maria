import "server-only";
import { Resend } from "resend";
import { env } from "@/config/env";

/** Instancia singleton de Resend, lista para usar en Server Actions y API Routes. */
export const resend = new Resend(env.RESEND_API_KEY);
