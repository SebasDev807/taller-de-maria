import { InventoryToolbar, InventoryTable, InventoryHeaderClient } from "@/components/admin/inventario";
import { getPaginatedProducts } from "@/actions/product.actions";

export default async function InventarioPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page, 10) : 1;
  const limit = 10;

  const { products, totalPages, currentPage } = await getPaginatedProducts(page, limit);

  return (
    <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen bg-surface">
      {/* Header Section (Client Component para manejar el modal) */}
      <InventoryHeaderClient />

      {/* Main Content Section */}
      <div className="px-margin-mobile md:px-margin-desktop py-md max-w-[1400px] mx-auto">
        <InventoryToolbar />

        <div className="bg-surface-container-lowest rounded-lg border border-surface-container-high shadow-sm overflow-hidden">
          <InventoryTable 
            products={products} 
            currentPage={currentPage} 
            totalPages={totalPages} 
          />
        </div>
      </div>
    </main>
  );
}
