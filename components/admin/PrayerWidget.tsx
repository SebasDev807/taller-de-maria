import { DailyContent } from "@/lib/mockData";
import { CustomButton } from "../shared"

/**
 * Propiedades para el componente PrayerWidget.
 */
interface PrayerWidgetProps {
  /**
   * El contenido diario que representa la oración.
   */
  prayer?: DailyContent;
}

/**
 * Muestra el widget de la Oración del Día, permitiendo al usuario actualizar su texto.
 *
 * @param props - Las propiedades del componente que contienen los datos de la oración.
 * @returns El componente PrayerWidget renderizado.
 */
export const PrayerWidget = ({ prayer }: PrayerWidgetProps) => {
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
          defaultValue={prayer?.text || ""}
        />
      </div>
      <div className="flex justify-end">
        <CustomButton>Actualizar Oración</CustomButton>
      </div>
    </div>
  );
};