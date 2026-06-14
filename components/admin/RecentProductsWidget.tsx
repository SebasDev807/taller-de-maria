import { SerializedProduct } from "@/actions/types/product.types";
import Link from "next/link";

/**
 * Props for the RecentProductsWidget component.
 */
interface RecentProductsWidgetProps {
  /**
   * The list of recent products to display in the table.
   */
  products: SerializedProduct[];
}

/**
 * Displays a table widget of the most recently added or updated products
 * on the admin dashboard, including actions to edit or delete them.
 *
 * @param props - Component props containing the products data.
 * @returns The rendered RecentProductsWidget component.
 */
export const RecentProductsWidget = ({ products }: RecentProductsWidgetProps) => {
  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-surface-container-high">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline-md text-[20px] text-primary font-bold">Productos Recientes</h3>
        <Link href="/admin/inventario" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
          <span className="font-label-sm text-label-sm">Ver Todos</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-surface-container-high">
              <th className="py-4 font-label-md text-label-md text-on-surface-variant font-normal">Producto</th>
              <th className="py-4 font-label-md text-label-md text-on-surface-variant font-normal">Categoría</th>
              <th className="py-4 font-label-md text-label-md text-on-surface-variant font-normal">Precio</th>
              <th className="py-4 font-label-md text-label-md text-on-surface-variant font-normal text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="font-body-md text-body-md text-on-surface divide-y divide-surface-container-high">
            {products.slice(0, 4).map((product) => (
              <tr key={product.id} className="hover:bg-surface-container-low transition-colors group">
                <td className="py-4 flex items-center gap-3">
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <div className="w-10 h-10 bg-surface-variant rounded overflow-hidden flex items-center justify-center border border-outline-variant relative">
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover"
                        src={product.imageUrls[0]}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-surface-variant rounded flex items-center justify-center border border-outline-variant">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                        {product.icon || "image"}
                      </span>
                    </div>
                  )}
                  <span className="font-medium text-primary">{product.name}</span>
                </td>
                <td className="py-4 text-on-surface-variant">{product.category || "General"}</td>
                <td className="py-4 font-semibold">{formatPrice(product.price)}</td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-on-surface-variant hover:text-primary cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button className="p-1 text-on-surface-variant hover:text-error cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
