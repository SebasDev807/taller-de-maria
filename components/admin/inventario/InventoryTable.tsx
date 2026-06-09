import React from 'react';
import Image from 'next/image';
import { InventoryPagination } from './InventoryPagination';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  imageUrl: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

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
            <tr
              key={item.id}
              className={`hover:bg-surface-container-low transition-colors group ${item.status === 'out-of-stock' ? 'bg-surface-dim/30' : ''}`}
            >
              <td className="py-4 px-6">
                <div className={`w-12 h-12 rounded bg-surface-variant overflow-hidden border border-outline-variant/30 ${item.status === 'out-of-stock' ? 'opacity-50' : ''}`}>
                  {item.imageUrl ? (
                    <Image width={48} height={48} alt={item.name} className="w-full h-full object-cover" src={item.imageUrl} />
                  ) : (
                    <div className="w-full h-full bg-surface-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-outline">image</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 px-6">
                <p className={`font-label-md text-label-md ${item.status === 'out-of-stock' ? 'text-outline' : 'text-primary'}`}>{item.name}</p>
                <p className={`${item.status === 'out-of-stock' ? 'text-outline' : 'text-on-surface-variant'} text-sm mt-0.5`}>SKU: {item.sku}</p>
              </td>
              <td className={`py-4 px-6 ${item.status === 'out-of-stock' ? 'text-outline' : 'text-on-surface-variant'}`}>{item.category}</td>
              <td className="py-4 px-6">
                {item.status === 'in-stock' && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{item.stock} en stock</span>
                  </div>
                )}
                {item.status === 'low-stock' && (
                  <div className="inline-flex items-center gap-2 bg-[#FFE082]/20 text-[#604100] px-2 py-1 rounded">
                    <span className="w-2 h-2 rounded-full bg-[#FFE082]"></span>
                    <span className="font-label-sm text-label-sm">{item.stock} en stock (Bajo)</span>
                  </div>
                )}
                {item.status === 'out-of-stock' && (
                  <div className="inline-flex items-center gap-2 bg-error-container/30 text-error px-2 py-1 rounded">
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                    <span className="font-label-sm text-label-sm">Agotado</span>
                  </div>
                )}
              </td>
              <td className={`py-4 px-6 text-right font-label-md text-label-md ${item.status === 'out-of-stock' ? 'text-outline' : ''}`}>${item.price.toFixed(2)}</td>
              <td className="py-4 px-6 text-center">
                <button className="cursor-pointer text-outline hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <InventoryPagination />
    </div>
  );
};
