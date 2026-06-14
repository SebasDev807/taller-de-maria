import { SerializedProduct } from "@/actions/types/product.types";
import Link from "next/link";

interface StockAlertsWidgetProps {
  products: SerializedProduct[];
}

/**
 * Displays a widget with stock alerts, showing a list of products
 * that are low in stock or out of stock.
 *
 * @param props - Component props containing the products data.
 * @returns The rendered StockAlertsWidget component.
 */
export const StockAlertsWidget = ({ products }: StockAlertsWidgetProps) => {
  const lowStockProducts = products.filter(product => product.stock < 5);
  const alertsCount = lowStockProducts.length;

  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col border border-surface-container-high">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
          <h3 className="font-headline-md text-[20px] text-primary font-bold">Alertas de Stock</h3>
        </div>
        {alertsCount > 0 && (
          <span className="bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-1 rounded">
            {alertsCount} {alertsCount === 1 ? 'Aviso' : 'Avisos'}
          </span>
        )}
      </div>

      {alertsCount > 0 ? (
        <ul className="flex flex-col gap-4 flex-1">
          {lowStockProducts.slice(0, 5).map((product) => {
            const isOutOfStock = product.stock === 0;
            return (
              <li 
                key={product.id}
                className={`flex items-center justify-between p-4 bg-surface-container-low rounded-lg border ${isOutOfStock ? 'border-error/20' : 'border-secondary-container/50'}`}
              >
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">{product.name}</p>
                  <p className={`font-label-sm text-label-sm mt-1 ${isOutOfStock ? 'text-error' : 'text-secondary'}`}>
                    {isOutOfStock ? 'Agotado' : `Quedan ${product.stock} unidades`}
                  </p>
                </div>
                <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <span className="material-symbols-outlined text-[48px] text-surface-container-highest mb-4">check_circle</span>
          <p className="text-on-surface-variant font-body-md text-body-md">El inventario está en niveles óptimos.</p>
        </div>
      )}

      <Link href="/admin/inventario" className="mt-6 text-center font-label-md text-label-md text-secondary hover:underline underline-offset-4">
        Ver Inventario Completo
      </Link>
    </section>
  );
};
