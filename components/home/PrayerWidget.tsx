import { getPrayer } from "@/actions/prayer.actions";
import { ActionButton } from "./ActionButton";

/**
 * Componente que muestra la oración diaria.
 * Obtiene la oración más reciente directamente de la base de datos.
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
    <article className="col-span-1 lg:col-span-5 bg-surface-container-low rounded-xl p-lg flex flex-col justify-between min-h-[400px] border border-surface-container-highest">
      <div>
        <div className="flex items-center gap-sm mb-6 text-on-surface-variant">
          <span className="material-symbols-outlined text-secondary">folded_hands</span>
          <span className="font-label-md text-label-md uppercase tracking-wider">Oración Diaria</span>
        </div>
        {displayTitle && (
          <h2 className="font-headline-sm text-headline-sm text-primary uppercase tracking-wide mb-2">
            {displayTitle}
          </h2>
        )}
        <p className="font-headline-md text-headline-md text-primary italic leading-relaxed mb-6">
          {displayText}
        </p>
        {displayReference && (
          <span className="text-label-sm text-secondary font-label-sm italic block -mt-2">
            — {displayReference}
          </span>
        )}
      </div>
      <div className="mt-auto">
        <ActionButton variant="secondary" icon="favorite">
          Guardar Oración
        </ActionButton>
      </div>
    </article>
  );
};
