"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { CustomButton, FieldError } from "../shared";
import { createPrayer, deletePrayer } from "@/actions/prayer.actions";
import { prayerSchema } from "@/actions/schemas";
import type { z } from "zod";
import { prayerResolver } from "@/helpers";
import type { PrayerHistoryData } from "@/actions/types";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

/** Tipo inferido del esquema de validación del formulario. */
type PrayerFormValues = z.infer<typeof prayerSchema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Propiedades para el componente PrayerForm.
 */
interface PrayerFormProps {
  /**
   * Historial de oraciones publicadas.
   */
  history?: PrayerHistoryData[];
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
 * Formulario para crear o actualizar la oración del día, controlado por
 * react-hook-form. Al enviarlo invoca el server action `createPrayer`.
 *
 * @param props - Las propiedades del componente que contienen el historial.
 * @returns El componente PrayerForm renderizado.
 */
export const PrayerForm = ({ history = [] }: PrayerFormProps) => {

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PrayerFormValues>({
    resolver: prayerResolver,
    defaultValues: {
      title: "",
      text: "",
      reference: "",
    },
  });

  const onSubmit = async (values: PrayerFormValues) => {
    setServerError(null);
    setSuccess(false);

    const formData = new FormData();
    if (values.title) formData.set("title", values.title);
    formData.set("text", values.text);
    if (values.reference) {
      formData.set("reference", values.reference);
    }

    const result = await createPrayer(formData);

    if (!result.success) {
      setServerError(result.error ?? "Error inesperado.");
    } else {
      setSuccess(true);
      reset({ title: "", text: "", reference: "" });
    }
  };

  const handleSelectHistory = (item: PrayerHistoryData) => {
    reset({ title: item.title || "", text: item.text, reference: item.reference || "" });
    setSuccess(false);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await deletePrayer(id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 relative">

      {/* Header del Formulario y Toggle de Historial */}
      <div className="flex justify-between items-center mb-2 relative">
        <span className="font-label-md text-on-surface">Oración Actual</span>
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
                    <div className="flex-1 min-w-0 pr-2">
                      {item.title && (
                        <h5 className="font-headline-sm text-primary text-sm uppercase mb-0.5 truncate">
                          {item.title}
                        </h5>
                      )}
                      <p className="font-body-sm text-on-surface text-sm truncate">
                        {item.text.length > 60
                          ? item.text.slice(0, 60) + "..."
                          : item.text}
                      </p>
                      {item.reference && (
                        <span className="text-label-sm text-secondary italic block mt-0.5">
                          {item.reference}
                        </span>
                      )}
                      <span className="text-label-sm text-outline block mt-1">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, item.id)}
                      className="cursor-pointer text-error opacity-0 group-hover/item:opacity-100 transition-opacity rounded shrink-0"
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

      {/* Campo: Título (Opcional) */}
      <div className="flex flex-col gap-2">
        <label
          className="font-label-md text-label-md text-on-surface"
          htmlFor="prayer-title"
        >
          Título (Opcional)
        </label>
        <input
          {...register("title")}
          className={inputBase}
          id="prayer-title"
          type="text"
          placeholder="Ej. Oración de la Serenidad"
          aria-describedby={errors.title ? "prayer-title-error" : undefined}
        />
        <FieldError id="prayer-title-error" message={errors.title?.message} />
      </div>

      {/* Campo: Referencia (Opcional) */}
      <div className="flex flex-col gap-2">
        <label
          className="font-label-md text-label-md text-on-surface"
          htmlFor="prayer-reference"
        >
          Referencia (Opcional)
        </label>
        <input
          {...register("reference")}
          className={inputBase}
          id="prayer-reference"
          type="text"
          placeholder="Ej. San Francisco de Asís"
          aria-describedby={errors.reference ? "prayer-reference-error" : undefined}
        />
        <FieldError id="prayer-reference-error" message={errors.reference?.message} />
      </div>
      {/* Campo: Texto */}
      <div className="flex flex-col gap-2">
        <label
          className="font-label-md text-label-md text-on-surface"
          htmlFor="prayer-text"
        >
          Oración del Día
        </label>
        <textarea
          {...register("text")}
          className={`${inputBase} resize-none`}
          id="prayer-text"
          placeholder="Ingrese la oración diaria aquí..."
          rows={5}
          aria-describedby={errors.text ? "prayer-text-error" : undefined}
        />
        <FieldError id="prayer-text-error" message={errors.text?.message} />
      </div>


      {/* Feedback del servidor */}
      {serverError && (
        <FieldError id="prayer-server-error" message={serverError} />
      )}
      {success && (
        <p className="mt-1 text-sm text-success font-body-sm" role="status">
          ¡Oración actualizada correctamente!
        </p>
      )}

      {/* Acción */}
      <div className="flex justify-end mt-2">
        <CustomButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Actualizar Oración"}
        </CustomButton>
      </div>
    </form>
  );
};