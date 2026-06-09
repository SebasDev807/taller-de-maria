"use client";

import { useState } from "react";
import { AdminPageHeader } from "./AdminPageHeader";
import { ProductFormModal } from "./inventario";

export const DashboardHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AdminPageHeader onActionClick={() => setIsModalOpen(true)} />
      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
