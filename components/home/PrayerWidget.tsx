import { DailyContent } from "@/lib/mockData";
import { ActionButton } from "./ActionButton";

interface PrayerWidgetProps {
  content: DailyContent;
}

/**
 * Componente que muestra la oración diaria.
 * Renderiza una tarjeta de contenido secundario con una oración y botón de acción.
 *
 * @param {PrayerWidgetProps} props - Propiedades del componente PrayerWidget.
 * @param {DailyContent} props.content - Objeto que contiene la información de la oración.
 * @returns {React.JSX.Element} La tarjeta de oración renderizada.
 */
export const PrayerWidget = ({ content }: PrayerWidgetProps) => {
  return (
    <article className="col-span-1 lg:col-span-5 bg-surface-container-low rounded-xl p-lg flex flex-col justify-between min-h-[400px] border border-surface-container-highest">
      <div>
        <div className="flex items-center gap-sm mb-6 text-on-surface-variant">
          <span className="material-symbols-outlined text-secondary">{content.icon}</span>
          <span className="font-label-md text-label-md uppercase tracking-wider">Oración Diaria</span>
        </div>
        <p className="font-headline-md text-headline-md text-primary italic leading-relaxed mb-6">
          {content.title}
        </p>
      </div>
      <div className="mt-auto">
        <ActionButton variant="secondary" icon="favorite">
          Guardar Oración
        </ActionButton>
      </div>
    </article>
  );
};
