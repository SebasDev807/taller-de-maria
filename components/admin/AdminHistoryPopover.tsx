"use client";

/**
 * Representa un ítem genérico del historial del popover de administración.
 */
export interface HistoryItem {
  /** Identificador único del ítem. */
  id: string;
  /** Título opcional del ítem (e.g. evangelio). */
  title?: string;
  /** Texto principal del ítem (se trunca a `previewLength` caracteres). */
  text: string;
  /** Referencia o fuente opcional. */
  reference?: string;
  /** Fecha ISO de la última actualización. */
  updatedAt: string;
}

/**
 * Propiedades para el componente AdminHistoryPopover.
 */
interface AdminHistoryPopoverProps<T extends HistoryItem> {
  /** Lista de ítems a mostrar en el historial. */
  items: T[];
  /** Callback al seleccionar un ítem (rellena el formulario). */
  onSelect: (item: T) => void;
  /** Callback al eliminar un ítem. */
  onDelete: (e: React.MouseEvent, id: string) => void;
  /** Número máximo de caracteres del preview del texto. Por defecto 60. */
  previewLength?: number;
}

/**
 * Popover de historial reutilizable para formularios de administración.
 * Se activa al hacer hover sobre el botón de historial y muestra una lista
 * de ítems con vista previa de texto, referencia y fecha.
 *
 * @param props - Las propiedades del componente.
 * @returns El botón con popover renderizado.
 */
export const AdminHistoryPopover = <T extends HistoryItem>({
  items,
  onSelect,
  onDelete,
  previewLength = 60,
}: AdminHistoryPopoverProps<T>) => {
  if (items.length === 0) return null;

  return (
    <div className="relative group">
      <button
        type="button"
        className="cursor-pointer flex items-center gap-1 text-secondary text-label-sm font-label-sm transition-colors py-1"
        aria-label="Ver historial"
      >
        <span className="material-symbols-outlined text-sm">history</span>
      </button>

      {/* Popover desplegable */}
      <div className="absolute right-0 top-full pt-1 w-80 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 max-h-[300px] overflow-y-auto flex flex-col gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="p-3 bg-surface-container-lowest rounded border border-outline-variant cursor-pointer hover:border-secondary hover:bg-surface-variant/30 transition-colors group/item flex justify-between items-start"
            >
              <div className="flex-1 min-w-0 pr-2">
                {item.title && (
                  <h5 className="font-headline-sm text-primary text-sm uppercase mb-0.5 truncate">
                    {item.title}
                  </h5>
                )}
                <p className="font-body-sm text-on-surface text-sm truncate">
                  {item.text.length > previewLength
                    ? item.text.slice(0, previewLength) + "..."
                    : item.text}
                </p>
                {item.reference && (
                  <span className="text-label-sm text-secondary italic block mt-0.5">
                    {item.reference}
                  </span>
                )}
                <span className="text-label-sm text-outline block mt-1">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => onDelete(e, item.id)}
                className="cursor-pointer text-error opacity-0 group-hover/item:opacity-100 transition-opacity rounded shrink-0"
                title="Eliminar registro"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
