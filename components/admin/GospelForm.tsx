"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { DailyContent } from "@/lib/mockData";
import { CustomButton, FieldError } from "../shared";
import { upsertGospel } from "@/actions/gospel.actions";
import { gospelSchema } from "@/actions/schemas";
import type { z } from "zod";
import { gospelResolver } from "@/helpers";


// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

/** Tipo inferido del esquema de validación del formulario. */
type GospelFormValues = z.infer<typeof gospelSchema>;



// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Propiedades para el componente GospelWidget.
 */
interface GospelWidgetProps {
    /**
     * El contenido diario que representa el evangelio.
     */
    gospel?: DailyContent;
}

// ---------------------------------------------------------------------------
// Estilos helpers
// ---------------------------------------------------------------------------

const inputBase =
    "w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-body-md text-on-surface p-4 transition-colors rounded-t";

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

/**
 * Muestra el widget del Evangelio del Día como un formulario controlado
 * por react-hook-form. Al enviarlo invoca el server action `upsertGospel`.
 *
 * @param props - Las propiedades del componente que contienen los datos del evangelio.
 * @returns El componente GospelForm renderizado.
 */
export const GospelForm = ({ gospel }: GospelWidgetProps) => {

    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<GospelFormValues>({
        resolver: gospelResolver,
        defaultValues: {
            title: gospel?.title ?? "",
            text: gospel?.text ?? "",
        },
    });

    const onSubmit = async (values: GospelFormValues) => {
        setServerError(null);
        setSuccess(false);

        const formData = new FormData();

        formData.set("title", values.title);
        formData.set("text", values.text);

        const result = await upsertGospel(formData);

        if (!result.success) {
            setServerError(result.error ?? "Error inesperado.");
        } else {
            setSuccess(true);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            {/* Campo: Título */}
            <div className="flex flex-col gap-2">
                <label
                    className="font-label-md text-label-md text-on-surface"
                    htmlFor="gospel-title"
                >
                    Título del Evangelio
                </label>
                <input
                    {...register("title")}
                    className={inputBase}
                    id="gospel-title"
                    type="text"
                    placeholder="Ingrese el título del evangelio aquí..."
                    aria-describedby={errors.title ? "gospel-title-error" : undefined}
                />
                <FieldError id="gospel-title-error" message={errors.title?.message} />
            </div>

            {/* Campo: Texto */}
            <div className="flex flex-col gap-2">
                <label
                    className="font-label-md text-label-md text-on-surface"
                    htmlFor="gospel"
                >
                    Evangelio del Día
                </label>
                <textarea
                    {...register("text")}
                    className={`${inputBase} resize-none`}
                    id="gospel"
                    placeholder="Ingrese el texto del evangelio aquí..."
                    rows={5}
                    aria-describedby={errors.text ? "gospel-text-error" : undefined}
                />
                <FieldError id="gospel-text-error" message={errors.text?.message} />
            </div>

            {/* Feedback del servidor */}
            {serverError && (
                <FieldError id="gospel-server-error" message={serverError} />
            )}
            {success && (
                <p className="mt-1 text-sm text-success font-body-sm" role="status">
                    ¡Evangelio actualizado correctamente!
                </p>
            )}

            {/* Acción */}
            <div className="flex justify-end">
                <CustomButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Actualizar Evangelio"}
                </CustomButton>
            </div>
        </form>
    );
};