import { aboutSchema } from "@/actions/schemas";
import { Resolver } from "react-hook-form";
import z from "zod";

type AboutFormValues = z.infer<typeof aboutSchema>;

export const aboutResolver: Resolver<AboutFormValues> = async (values) => {
    const result = aboutSchema.safeParse(values);

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
