/**
 * Displays a widget with stock alerts, showing a list of products
 * that are low in stock or out of stock.
 *
 * @returns The rendered StockAlertsWidget component.
 */
export const StockAlertsWidget = () => {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col border border-surface-container-high">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
          <h3 className="font-headline-md text-[20px] text-primary font-bold">Alertas de Stock</h3>
        </div>
        <span className="bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-1 rounded">
          3 Avisos
        </span>
      </div>

      <ul className="flex flex-col gap-4 flex-1">
        <li className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-error/20">
          <div>
            <p className="font-label-md text-label-md text-on-surface font-semibold">Rosario de Madera de Olivo</p>
            <p className="font-label-sm text-label-sm text-error mt-1">Agotado</p>
          </div>
          <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </li>

        <li className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-secondary-container/50">
          <div>
            <p className="font-label-md text-label-md text-on-surface font-semibold">Vela Aromática &apos;Paz&apos;</p>
            <p className="font-label-sm text-label-sm text-secondary mt-1">Quedan 2 unidades</p>
          </div>
          <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </li>

        <li className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-secondary-container/50">
          <div>
            <p className="font-label-md text-label-md text-on-surface font-semibold">Medalla Milagrosa Plata</p>
            <p className="font-label-sm text-label-sm text-secondary mt-1">Quedan 5 unidades</p>
          </div>
          <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </li>
      </ul>

      <a className="mt-6 text-center font-label-md text-label-md text-secondary hover:underline underline-offset-4" href="#">
        Ver Inventario Completo
      </a>
    </section>
  );
};
