// ---------------------------------------------------------------------------
// Resolver personalizado (sin @hookform/resolvers)
// ---------------------------------------------------------------------------

import { prayerSchema } from "@/actions/schemas";
import { Resolver } from "react-hook-form";
import z from "zod";

/**
 * Resolver que integra react-hook-form con el esquema de Zod de la oración,
 * sin necesidad del paquete externo `@hookform/resolvers`.
 */

/** Tipo inferido del esquema de validación del formulario. */
type PrayerFormValues = z.infer<typeof prayerSchema>;

export const prayerResolver: Resolver<PrayerFormValues> = async (values) => {
    const result = prayerSchema.safeParse(values);

    if (result.success) {
        return { values: result.data, errors: {} };
    }

    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!errors[field]) {
            errors[field] = { type: issue.code, message: issue.message };
        }
    }

    return { values: {}, errors };
};
