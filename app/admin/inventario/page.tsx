import { AdminPageHeader } from "@/components/admin";
import { InventoryToolbar, InventoryTable } from "@/components/admin";

export default function InventarioPage() {
  return (
    <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen bg-surface">
      {/* Header Section */}
      <div className="px-margin-mobile md:px-margin-desktop py-lg border-b border-surface-container-high bg-surface-container-lowest">
        <div className="max-w-[1400px] mx-auto">
          <AdminPageHeader
            title="Gestión de Inventario"
            description="Administra tu catálogo, rastrea niveles de stock, y actualiza detalles de productos."
            actionLabel="Nuevo Producto"
            actionIcon="add"
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="px-margin-mobile md:px-margin-desktop py-md max-w-[1400px] mx-auto">
        <InventoryToolbar />

        <div className="bg-surface-container-lowest rounded-lg border border-surface-container-high shadow-sm overflow-hidden">
          <InventoryTable />
        </div>
      </div>
    </main>
  );
}
