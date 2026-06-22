"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { aboutResolver } from "@/helpers";

const ICONS = [
  { value: "favorite", label: "Devoción (Corazón)" },
  { value: "history_edu", label: "Tradición (Pluma)" },
  { value: "handyman", label: "Artesanía (Herramientas)" },
  { value: "church", label: "Fe (Iglesia)" },
  { value: "stars", label: "Excelencia (Estrellas)" },
  { value: "psychology", label: "Filosofía (Mente)" },
  { value: "workspace_premium", label: "Calidad (Premio)" },
  { value: "palette", label: "Arte (Paleta)" },
];


import { CustomButton, FieldError } from "../shared";
import { updateAboutConfig } from "@/actions/about.actions";
import { aboutSchema } from "@/actions/schemas/about.schema";
import type { z } from "zod";
import type { AboutData } from "@/actions/types";

type AboutFormValues = z.infer<typeof aboutSchema>;

interface AboutFormProps {
  initialData?: AboutData | null;
}

const inputBase =
  "w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-body-md text-on-surface p-4 transition-colors rounded-t";

export const AboutForm = ({ initialData }: AboutFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AboutFormValues>({
    resolver: aboutResolver,
    defaultValues: {
      title: initialData?.title || "",
      history: initialData?.history || "",
      address: initialData?.address || "",
      contact: initialData?.contact || "",
      schedule: initialData?.schedule || "",
      pillars: initialData?.pillars || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pillars",
  });

  const onSubmit = async (values: AboutFormValues) => {
    setServerError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.set("title", values.title);
    formData.set("history", values.history);
    formData.set("address", values.address);
    formData.set("contact", values.contact);
    formData.set("schedule", values.schedule);
    formData.set("pillars", JSON.stringify(values.pillars));

    const result = await updateAboutConfig(formData);

    if (!result.success) {
      setServerError(result.error ?? "Error inesperado.");
    } else {
      setSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      
      {/* Campo: Título */}
      <div className="flex flex-col gap-2">
        <label className="font-label-md text-label-md text-on-surface" htmlFor="title">
          Título de la sección
        </label>
        <input
          {...register("title")}
          className={inputBase}
          id="title"
          type="text"
          placeholder="Ej. Taller de María"
        />
        <FieldError id="title-error" message={errors.title?.message} />
      </div>

      {/* Campo: Historia */}
      <div className="flex flex-col gap-2">
        <label className="font-label-md text-label-md text-on-surface" htmlFor="history">
          Nuestra Historia
        </label>
        <textarea
          {...register("history")}
          className={`${inputBase} resize-none`}
          id="history"
          placeholder="Escribe la historia aquí..."
          rows={6}
        />
        <FieldError id="history-error" message={errors.history?.message} />
      </div>

      {/* Campo: Dirección */}
      <div className="flex flex-col gap-2">
        <label className="font-label-md text-label-md text-on-surface" htmlFor="address">
          Dirección
        </label>
        <input
          {...register("address")}
          className={inputBase}
          id="address"
          type="text"
          placeholder="Ej. Calle Falsa 123"
        />
        <FieldError id="address-error" message={errors.address?.message} />
      </div>

      {/* Campo: Contacto */}
      <div className="flex flex-col gap-2">
        <label className="font-label-md text-label-md text-on-surface" htmlFor="contact">
          Contacto (Teléfono/Email)
        </label>
        <input
          {...register("contact")}
          className={inputBase}
          id="contact"
          type="text"
          placeholder="Ej. +57 300 000 0000"
        />
        <FieldError id="contact-error" message={errors.contact?.message} />
      </div>

      {/* Campo: Horario */}
      <div className="flex flex-col gap-2">
        <label className="font-label-md text-label-md text-on-surface" htmlFor="schedule">
          Horario de Atención
        </label>
        <input
          {...register("schedule")}
          className={inputBase}
          id="schedule"
          type="text"
          placeholder="Ej. Lunes a Viernes: 8am - 6pm"
        />
        <FieldError id="schedule-error" message={errors.schedule?.message} />
      </div>

      {/* Campo: Pilares */}
      <div className="flex flex-col gap-4">
        <label className="font-label-md text-label-md text-on-surface">Pilares del Taller</label>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-surface-container-lowest border border-outline-variant rounded flex flex-col gap-4 relative">
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-error hover:text-error/80 transition-colors"
              title="Eliminar pilar"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2 w-full md:w-1/3">
                <label className="font-label-sm text-label-sm text-on-surface-variant">Icono</label>
                <select
                  {...register(`pillars.${index}.icon` as const)}
                  className={inputBase}
                >
                  {ICONS.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
                {errors.pillars?.[index]?.icon && (
                  <FieldError id={`pillars-${index}-icon-error`} message={errors.pillars[index].icon?.message} />
                )}
              </div>
              <div className="flex flex-col gap-2 w-full md:w-2/3">
                <label className="font-label-sm text-label-sm text-on-surface-variant">Título</label>
                <input
                  {...register(`pillars.${index}.title` as const)}
                  className={inputBase}
                  type="text"
                  placeholder="Ej. Devoción"
                />
                {errors.pillars?.[index]?.title && (
                  <FieldError id={`pillars-${index}-title-error`} message={errors.pillars[index].title?.message} />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant">Descripción</label>
              <textarea
                {...register(`pillars.${index}.description` as const)}
                className={`${inputBase} resize-none`}
                placeholder="Descripción del pilar..."
                rows={3}
              />
                {errors.pillars?.[index]?.description && (
                  <FieldError id={`pillars-${index}-description-error`} message={errors.pillars[index].description?.message} />
                )}
            </div>
          </div>
        ))}
        {errors.pillars?.message && typeof errors.pillars.message === 'string' && (
          <FieldError id="pillars-root-error" message={errors.pillars.message} />
        )}
        <button
          type="button"
          onClick={() => append({ icon: "favorite", title: "", description: "" })}
          className="self-start text-secondary font-label-md flex items-center gap-2 hover:bg-secondary-container p-2 rounded transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Agregar Pilar
        </button>
      </div>

      {/* Feedback del servidor */}
      {serverError && <FieldError id="server-error" message={serverError} />}
      {success && (
        <p className="mt-1 text-sm text-success font-body-sm" role="status">
          ¡Configuración actualizada correctamente!
        </p>
      )}

      {/* Acción */}
      <div className="flex justify-end mt-4">
        <CustomButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </CustomButton>
      </div>
    </form>
  );
};
