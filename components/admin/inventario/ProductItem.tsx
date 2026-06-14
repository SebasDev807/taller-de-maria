"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { InventoryItem } from '@/interfaces';

interface ProductItemProps {
    item: InventoryItem;
}

export const ProductItem = ({ item }: ProductItemProps) => {
    const router = useRouter();
    
    // Generamos un slug simple a partir del nombre o usamos el id si preferimos
    // Para cumplir con el requerimiento, usamos un slug basado en el nombre
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const handleRowClick = () => {
        router.push(`/admin/inventario/${slug}`);
    };

    return (
        <tr
            key={item.id}
            onClick={handleRowClick}
            className={`hover:bg-surface-container-low transition-colors group cursor-pointer ${item.status === 'out-of-stock' ? 'bg-surface-dim/30' : ''}`}
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
                <div className="flex items-center justify-center gap-3">
                    <div className="relative group/edit flex justify-center">
                        <button 
                            type="button" 
                            className="cursor-pointer text-outline hover:text-yellow-500 transition-colors flex items-center justify-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Aquí irá la lógica de editar
                            }}
                        >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>

                    </div>
                    <div className="relative group/delete flex justify-center">

                        <button 
                            type="button" 
                            className="cursor-pointer text-outline hover:text-red-500 transition-colors group/btn flex items-center justify-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Aquí irá la lógica de eliminar
                            }}
                        >
                            <span className="material-symbols-outlined text-[20px] group-hover/btn:[font-variation-settings:'FILL'_1]">delete</span>
                        </button>

                    </div>
                </div>
            </td>
        </tr>
    )
}
