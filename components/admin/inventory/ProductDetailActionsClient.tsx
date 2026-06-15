"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SerializedProduct } from "@/actions/types/product.types";
import { deleteProduct } from "@/actions/product.actions";
import { EditProductModal } from "./EditProductModal";

interface ProductDetailActionsClientProps {
  product: SerializedProduct;
}

export const ProductDetailActionsClient = ({ product }: ProductDetailActionsClientProps) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${product.name}"?`)) {
      const result = await deleteProduct(product.id);
      if (result.success) {
        router.push("/admin/inventario");
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div className="bg-surface-container-lowest shadow-sm rounded-xl p-md border border-surface-container-high flex flex-col gap-3">
      <button 
        type="button"
        onClick={() => setIsEditModalOpen(true)}
        className="flex items-center justify-center gap-2 w-full px-md py-sm bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">edit</span>
        Editar Producto
      </button>
      <button 
        type="button"
        onClick={handleDelete}
        className="flex items-center justify-center gap-2 w-full px-md py-sm border-2 border-error text-error font-label-md text-label-md rounded-lg hover:bg-error-container/20 active:scale-95 transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">delete</span>
        Eliminar Producto
      </button>

      {isEditModalOpen && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={product}
        />
      )}
    </div>
  );
};
