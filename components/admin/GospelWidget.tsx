import { DailyContent } from "@/lib/mockData";
import { CustomButton } from "../shared";

/**
 * Propiedades para el componente GospelWidget.
 */
interface GospelWidgetProps {
    /**
     * El contenido diario que representa el evangelio.
     */
    gospel?: DailyContent;
}

/**
 * Muestra el widget del Evangelio del Día, permitiendo al usuario actualizar su texto.
 *
 * @param props - Las propiedades del componente que contienen los datos del evangelio.
 * @returns El componente GospelWidget renderizado.
 */
export const GospelWidget = ({ gospel }: GospelWidgetProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="gospel-title">
                    Título del Evangelio
                </label>
                <input
                    className="w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-body-md text-on-surface p-4 transition-colors rounded-t"
                    id="gospel-title"
                    type="text"
                    placeholder="Ingrese el título del evangelio aquí..."
                    defaultValue={gospel?.title || ""}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="gospel">
                    Evangelio del Día
                </label>
                <textarea
                    className="w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-body-md text-on-surface p-4 resize-none transition-colors rounded-t"
                    id="gospel"
                    placeholder="Ingrese el texto del evangelio aquí..."
                    rows={5}
                    defaultValue={gospel?.text || ""}
                />
            </div>
            <div className="flex justify-end">
                <CustomButton>Actualizar Evangelio</CustomButton>
            </div>
        </div>
    );
};