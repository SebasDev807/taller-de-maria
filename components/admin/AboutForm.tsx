"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { aboutResolver } from "@/helpers";


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

  const onSubmit = async (values: AboutFormValues) => {
    setServerError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.set("title", values.title);
    formData.set("history", values.history);
    formData.set("address", values.address);
    formData.set("contact", values.contact);
    formData.set("schedule", values.schedule);
    formData.set("pillars", values.pillars.join("\n"));

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
      <div className="flex flex-col gap-2">
        <label className="font-label-md text-label-md text-on-surface" htmlFor="pillars">
          Pilares del Taller (Uno por línea)
        </label>
        <textarea
          {...register("pillars", {
            setValueAs: (v) => (typeof v === "string" ? v.split("\n").map(p => p.trim()).filter(p => p) : v),
          })}
          className={`${inputBase} resize-none`}
          id="pillars"
          placeholder="Pilar 1&#10;Pilar 2&#10;Pilar 3"
          rows={5}
        />
        <FieldError id="pillars-error" message={errors.pillars?.message} />
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
