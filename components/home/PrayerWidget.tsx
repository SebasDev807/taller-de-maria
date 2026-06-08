import { getPrayer } from "@/actions/prayer.actions";
import { ActionButton } from "./ActionButton";
import { ExpandableText } from "./ExpandableText";

/**
 * Componente que muestra la oración diaria.
 * Obtiene la oración más reciente directamente de la base de datos.
 * Usa `ExpandableText` para textos largos, igual que el GospelWidget.
 *
 * @returns {Promise<React.JSX.Element>} La tarjeta de oración renderizada.
 */
export const PrayerWidget = async () => {
  const result = await getPrayer();
  const prayer = result?.success ? result.data : null;

  const displayTitle = prayer?.title;
  const displayText =
    prayer?.text ||
    "La oración del día no se encuentra disponible. Por favor, regresa más tarde.";
  const displayReference = prayer?.reference;

  return (
    <article className="col-span-1 lg:col-span-5 bg-surface-container-low rounded-xl p-lg flex flex-col justify-between min-h-[400px] border border-surface-container-highest relative overflow-hidden self-start">
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-sm mb-6 text-on-surface-variant">
          <span className="material-symbols-outlined text-secondary">folded_hands</span>
          <span className="font-label-md text-label-md uppercase tracking-wider">Oración Diaria</span>
        </div>

        {displayTitle && (
          <h2 className="uppercase font-headline-sm text-headline-sm text-primary mb-2 tracking-wide">
            {displayTitle}
          </h2>
        )}
        {displayReference && (
          <p className="font-label-md text-label-md text-secondary mb-4 italic">
            {displayReference}
          </p>
        )}

        <div className="flex items-end justify-between gap-4 mt-auto flex-wrap">
          <ExpandableText
            text={displayText}
            maxLength={120}
            expandLabel="Mostrar más"
            collapseLabel="Mostrar menos"
            textClassName="font-headline-md text-headline-md text-primary italic leading-relaxed mb-8 whitespace-pre-wrap w-full"
          />
          <ActionButton variant="secondary" className="w-auto px-6" icon="favorite">
            Guardar Oración
          </ActionButton>
        </div>
      </div>

      {/* Icono decorativo de fondo */}
      <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
        <span className="material-symbols-outlined text-[300px]">folded_hands</span>
      </div>
    </article>
  );
};
