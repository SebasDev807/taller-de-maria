import { CustomButton } from "../shared"

/**
 * Formulario para crear o actualizar la oración del día.
 *
 * @returns El componente PrayerForm renderizado.
 */
export const PrayerForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-label-md text-label-md text-on-surface" htmlFor="prayer">
          Oración del Día
        </label>
        <textarea
          className="w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-body-md text-on-surface p-4 resize-none transition-colors rounded-t"
          id="prayer"
          placeholder="Ingrese la oración diaria aquí..."
          rows={5}
        />
      </div>
      <div className="flex justify-end">
        <CustomButton>Actualizar Oración</CustomButton>
      </div>
    </div>
  );
};