
import { InventoryPagination } from './InventoryPagination';
import { ProductItem } from './ProductItem';
import { SerializedProduct } from '@/actions/types/product.types';

interface InventoryTableProps {
  products: SerializedProduct[];
  currentPage: number;
  totalPages: number;
}

export const InventoryTable = ({ products, currentPage, totalPages }: InventoryTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-surface-container-high bg-surface">
            <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider w-16">Imagen</th>
            <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider">Nombre del Producto</th>
            <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider">Categoría</th>
            <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider">Nivel de Stock</th>
            <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider text-right">Precio</th>
            <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider text-center w-20">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-high font-body-md text-body-md text-on-surface">
          {products.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="py-8 text-center text-on-surface-variant">
                No hay productos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 0 && (
        <InventoryPagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
};
