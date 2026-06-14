"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin";
import { ProductFormModal } from "./ProductFormModal";

export const InventoryHeaderClient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="px-margin-mobile md:px-margin-desktop py-lg border-b border-surface-container-high bg-surface-container-lowest">
        <div className="max-w-[1400px] mx-auto">
          <AdminPageHeader
            title="Gestión de Inventario"
            description="Administra tu catálogo, rastrea niveles de stock, y actualiza detalles de productos."
            actionLabel="Nuevo Producto"
            actionIcon="add"
            onActionClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      
      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
