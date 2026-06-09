
import Image from 'next/image';
import { InventoryPagination } from './InventoryPagination';
import { ProductItem } from './ProductItem';
import { InventoryItem } from '@/interfaces';

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Rosario de Madera de Olivo',
    sku: 'RSY-001',
    category: 'Rosarios',
    stock: 42,
    price: 45.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD4Y0b1Yz--Hn_boEfoXA_36N9oOkue8BJ2uQGmz-GzBEvFokxbBAUS9hFPy8QAcRqOI1kFAnZQrbtEFT6ZXpdfb1vXXulTOjuJG-ullMuO7ltDky5beqaTsKu0GzBTmEtMdDVmVCg0vqCUlZvDC5DjJK0dK0ZcF26QN3Jhrc8an4lFJakehEgUUYRY9laWUIszBT8fPp0XsWRgKO9KA52-W4vR5mFePAbVt4BPguj07NnnVZ8fpC3m9M8e2SXsU_lJVtetw3hYHA',
    status: 'in-stock'
  },
  {
    id: '2',
    name: 'Colgante Crucifijo de Plata',
    sku: 'PND-042',
    category: 'Joyería',
    stock: 3,
    price: 85.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZyV4HQokUuCezCf9L92pSPf5v5uHIJyj-DVOL-rfkNPshG2FEs35c2Ml-XpabXJdHGE86HqDOh9ZbOIBuEsnZkRSrWKtmopf9YOYAqoktSiSEQdH3ezQUHj_CwEz3KehcE1t56m6ljtmwdr5j4l8hB4ssr3rUTxgSp_mJ-ybu7LgbeW4dfwuu0DltHvIwbJTLe9xbGKgaIpUSog_WTJ-xE79EaV7hvmf9Sig8FwBOo0iU86DeomvQWJlUymeQZd26rW3a15uuUx0',
    status: 'low-stock'
  },
  {
    id: '3',
    name: 'Vela de Devoción Mariana',
    sku: 'CND-011',
    category: 'Velas',
    stock: 15,
    price: 24.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvRaFbvVJX0Wbh-xZMJ_a4Lln9ww0khI0loCYJT_wEqmy2y0pRnNlFbGoMovSnKf0dMEWgDXJ6RrZGlbL1r4lqo5Oi_XQ1TTERvZFfZdWgSgoblAink8EYyk1YWSHACmTj-RKz6siakRt4rm0zYQfXvV3Cj8orakAP8KGOyrkNlSAixXmAPtosOKD0Xkx3iD4L3KNOJw0izCv_wd5MN8OrgKE4Kf6BsZIEShi03xDHQNbXu_3rM9EbWfnzbnxmnzOzsE5qtvzO1J0',
    status: 'in-stock'
  },
  {
    id: '4',
    name: 'Estatua Pintada a Mano',
    sku: 'STU-009',
    category: 'Estatuas',
    stock: 0,
    price: 120.00,
    imageUrl: '',
    status: 'out-of-stock'
  }
];

export const InventoryTable = () => {
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
          {mockInventory.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
      <InventoryPagination />
    </div>
  );
};
