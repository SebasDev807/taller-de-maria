import { getGospel } from "@/actions/gospel.actions";
import { GospelClientContent } from "./GospelClientContent";

/**
 * Componente que muestra el evangelio del día.
 * Renderiza una tarjeta principal destacada con el contenido del evangelio.
 *
 * @returns {React.JSX.Element} La tarjeta de evangelio renderizada.
 */
export const GospelWidget = async () => {
  const result = await getGospel();
  const dbGospel = result?.success ? result.data : null;

  const displayTitle = dbGospel?.title || "Evangelio de hoy";
  const displayText = dbGospel?.text || "La reflexión del evangelio para el día de hoy no se encuentra disponible. Por favor, regresa más tarde.";
  const displayReference = dbGospel?.reference;

  return (
    <article className="col-span-1 lg:col-span-7 bg-[#FFFFFF] rounded-xl p-lg shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-center min-h-100 self-start">
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-sm mb-6 text-on-surface-variant">
          <span className="material-symbols-outlined text-secondary">menu_book</span>
          <span className="font-label-md text-label-md uppercase tracking-wider">Evangelio del Día</span>
        </div>
        
        <GospelClientContent title={displayTitle} text={displayText} reference={displayReference} />

      </div>
      <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
        <span className="material-symbols-outlined text-[300px]">auto_awesome</span>
      </div>
    </article>
  );
};
