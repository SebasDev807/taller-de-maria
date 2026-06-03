import { DailyContent } from "@/lib/mockData";

/**
 * Props for the DailyReflectionWidget component.
 */
interface DailyReflectionWidgetProps {
  /**
   * The daily content item representing the Gospel (evangelio).
   */
  evangelio?: DailyContent;
  /**
   * The daily content item representing the Prayer (oracion).
   */
  oracion?: DailyContent;
}

/**
 * Displays the Daily Reflection widget on the admin dashboard,
 * allowing the user to update the daily Gospel and Prayer texts.
 *
 * @param props - The component props containing the daily content data.
 * @returns The rendered DailyReflectionWidget component.
 */
export const DailyReflectionWidget = ({ evangelio, oracion }: DailyReflectionWidgetProps) => {
  return (
    <section className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col border border-surface-container-high">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_stories
        </span>
        <h3 className="font-headline-md text-[20px] text-primary font-bold">Reflexión Diaria</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Evangelio Input */}
        <div className="flex flex-col gap-2">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="evangelio">
            Evangelio del Día
          </label>
          <textarea
            className="w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-body-md text-on-surface p-4 resize-none transition-colors rounded-t"
            id="evangelio"
            placeholder="Ingrese el texto del evangelio aquí..."
            rows={5}
            defaultValue={evangelio?.text || ""}
          />
        </div>

        {/* Oración Input */}
        <div className="flex flex-col gap-2">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="oracion">
            Oración del Día
          </label>
          <textarea
            className="w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-body-md text-on-surface p-4 resize-none transition-colors rounded-t"
            id="oracion"
            placeholder="Ingrese la oración diaria aquí..."
            rows={5}
            defaultValue={oracion?.title || ""}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-primary text-on-primary px-8 py-3 rounded hover:scale-95 transition-transform duration-200 font-label-md text-label-md cursor-pointer w-full sm:w-auto">
          Actualizar Contenido
        </button>
      </div>
    </section>
  );
};
