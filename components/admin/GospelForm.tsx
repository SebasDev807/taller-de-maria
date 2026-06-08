"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { CustomButton, FieldError } from "../shared";
import { createGospel, deleteGospel } from "@/actions/gospel.actions";
import { gospelSchema } from "@/actions/schemas";
import type { z } from "zod";
import { gospelResolver } from "@/helpers";
import type { GospelHistoryData } from "@/actions/types";
import { AdminHistoryPopover } from "./AdminHistoryPopover";

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
     * Historial de evangelios publicados.
     */
    history?: GospelHistoryData[];
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
 * por react-hook-form. Al enviarlo invoca el server action `createGospel`.
 *
 * @param props - Las propiedades del componente que contienen los datos del evangelio y el historial.
 * @returns El componente GospelForm renderizado.
 */
export const GospelForm = ({ history = [] }: GospelWidgetProps) => {

    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<GospelFormValues>({
        resolver: gospelResolver,
        defaultValues: {
            title: "",
            text: "",
            reference: "",
        },
    });

    const onSubmit = async (values: GospelFormValues) => {
        setServerError(null);
        setSuccess(false);

        const formData = new FormData();

        formData.set("title", values.title);
        formData.set("text", values.text);
        if (values.reference) {
            formData.set("reference", values.reference);
        }

        const result = await createGospel(formData);

        if (!result.success) {
            setServerError(result.error ?? "Error inesperado.");
        } else {
            setSuccess(true);
            reset({ title: "", text: "", reference: "" });
        }
    };

    const handleSelectHistory = (item: GospelHistoryData) => {
        reset({ title: item.title, text: item.text, reference: item.reference || "" });
        setSuccess(false);
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Evitar que seleccione el ítem al borrar
        await deleteGospel(id);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 relative">

            {/* Header del Formulario y Toggle de Historial */}
            <div className="flex justify-between items-center mb-2 relative">
                <span className="font-label-md text-on-surface">Evangelio Actual</span>
                <AdminHistoryPopover
                    items={history}
                    onSelect={handleSelectHistory}
                    onDelete={handleDelete}
                />
            </div>

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

            {/* Campo: Referencia */}
            <div className="flex flex-col gap-2">
                <label
                    className="font-label-md text-label-md text-on-surface"
                    htmlFor="gospel-reference"
                >
                    Referencia (Opcional)
                </label>
                <input
                    {...register("reference")}
                    className={inputBase}
                    id="gospel-reference"
                    type="text"
                    placeholder="Ej. Juan 3, 16"
                    aria-describedby={errors.reference ? "gospel-reference-error" : undefined}
                />
                <FieldError id="gospel-reference-error" message={errors.reference?.message} />
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
            <div className="flex justify-end mt-2">
                <CustomButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Actualizar Evangelio"}
                </CustomButton>
            </div>
        </form>
    );
};