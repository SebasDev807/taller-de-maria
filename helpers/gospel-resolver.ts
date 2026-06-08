// ---------------------------------------------------------------------------
// Resolver personalizado (sin @hookform/resolvers)
// ---------------------------------------------------------------------------

import { gospelSchema } from "@/actions/schemas";
import { Resolver } from "react-hook-form";
import z from "zod";

/**
 * Resolver que integra react-hook-form con el esquema de Zod del evangelio,
 * sin necesidad del paquete externo `@hookform/resolvers`.
 */

/** Tipo inferido del esquema de validación del formulario. */
type GospelFormValues = z.infer<typeof gospelSchema>;

export const gospelResolver: Resolver<GospelFormValues> = async (values) => {

    const result = gospelSchema.safeParse(values);

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