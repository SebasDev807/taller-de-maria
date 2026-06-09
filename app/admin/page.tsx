"use client";

import { useState } from "react";
import { mockProducts } from "@/lib/mockData";
import {
  AdminPageHeader,
  DailyReflectionWidget,
  StockAlertsWidget,
  RecentProductsWidget,
  CategoriesWidget,
} from "@/components";
import { ProductFormModal } from "@/components/admin";

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop min-h-screen">
      <AdminPageHeader onActionClick={() => setIsModalOpen(true)} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <DailyReflectionWidget />
        <StockAlertsWidget />
        <RecentProductsWidget products={mockProducts} />
        <CategoriesWidget />
      </div>

      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}
