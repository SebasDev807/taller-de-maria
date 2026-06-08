"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { DailyContent } from "@/lib/mockData";
import { CustomButton, FieldError } from "../shared";
import { createGospel, deleteGospel } from "@/actions/gospel.actions";
import { gospelSchema } from "@/actions/schemas";
import type { z } from "zod";
import { gospelResolver } from "@/helpers";
import type { GospelHistoryData } from "@/actions/types";

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
export const GospelForm = ({ gospel, history = [] }: GospelWidgetProps) => {

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

        const result = await createGospel(formData);

        if (!result.success) {
            setServerError(result.error ?? "Error inesperado.");
        } else {
            setSuccess(true);
        }
    };

    const handleSelectHistory = (item: GospelHistoryData) => {
        reset({ title: item.title, text: item.text });
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
                {history.length > 0 && (
                    <div className="relative group">
                        <button
                            type="button"
                            className="cursor-pointer flex items-center gap-1 text-secondary text-label-sm font-label-sm transition-colors py-1"
                        >
                            <span className="material-symbols-outlined text-sm">history</span>

                        </button>

                        {/* Popover desplegable */}
                        <div className="absolute right-0 top-full pt-1 w-80 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 max-h-[300px] overflow-y-auto flex flex-col gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                                {history.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleSelectHistory(item)}
                                        className="p-3 bg-surface-container-lowest rounded border border-outline-variant cursor-pointer hover:border-secondary hover:bg-surface-variant/30 transition-colors group/item flex justify-between items-start"
                                    >
                                        <div>
                                            <h5 className="font-headline-sm text-primary text-sm uppercase mb-1">{item.title}</h5>
                                            <span className="text-label-sm text-outline block">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => handleDelete(e, item.id)}
                                            className="cursor-pointer text-error opacity-0 group-hover/item:opacity-100 transition-opacity rounded"
                                            title="Eliminar registro"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
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