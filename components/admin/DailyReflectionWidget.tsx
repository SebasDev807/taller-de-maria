import { GospelForm } from "./GospelForm";
import { PrayerForm } from "./PrayerForm";
import { getGospelHistory } from "@/actions/gospel.actions";
import { getPrayerHistory } from "@/actions/prayer.actions";

/**
 * Muestra el widget de Reflexión Diaria en el panel de administración,
 * que contiene las secciones separadas para el Evangelio y la Oración.
 *
 * @returns El componente DailyReflectionWidget renderizado.
 */
export const DailyReflectionWidget = async () => {
  const historyResult = await getGospelHistory();
  const history = historyResult.success && historyResult.data ? historyResult.data : [];

  const prayerHistoryResult = await getPrayerHistory();
  const prayerHistory = prayerHistoryResult.success && prayerHistoryResult.data ? prayerHistoryResult.data : [];

  return (
    <section className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col border border-surface-container-high">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_stories
        </span>
        <h3 className="font-headline-md text-[20px] text-primary font-bold">Reflexión Diaria</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <GospelForm history={history} />
        <PrayerForm history={prayerHistory} />
      </div>
    </section>
  );
};
