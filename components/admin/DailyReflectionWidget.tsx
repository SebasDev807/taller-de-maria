import { DailyContent } from "@/lib/mockData";
import { GospelWidget } from "./GospelWidget";
import { PrayerWidget } from "./PrayerWidget";

/**
 * Propiedades para el componente DailyReflectionWidget.
 */
interface DailyReflectionWidgetProps {
  /**
   * El contenido diario que representa el evangelio.
   */
  gospel?: DailyContent;
  /**
   * El contenido diario que representa la oración.
   */
  prayer?: DailyContent;
}

/**
 * Muestra el widget de Reflexión Diaria en el panel de administración,
 * que contiene las secciones separadas para el Evangelio y la Oración.
 *
 * @param props - Las propiedades del componente que contienen los datos del contenido diario.
 * @returns El componente DailyReflectionWidget renderizado.
 */
export const DailyReflectionWidget = ({ gospel, prayer }: DailyReflectionWidgetProps) => {
  return (
    <section className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col border border-surface-container-high">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_stories
        </span>
        <h3 className="font-headline-md text-[20px] text-primary font-bold">Reflexión Diaria</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <GospelWidget gospel={gospel} />
        <PrayerWidget prayer={prayer} />
      </div>
    </section>
  );
};
