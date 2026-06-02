import { TopNavBar, Footer, CatalogCard, CatalogFilters, Pagination } from "@/ui";
import { mockProducts } from "@/lib/mockData";

/**
 * Componente principal de la página de catálogo de productos.
 * Renderiza la cabecera, controles de filtro, y la grilla de productos 
 * utilizando diferentes variantes de tarjetas según el diseño.
 *
 * @param {Object} props
 * @param {Promise<{ [key: string]: string | string[] | undefined }>} props.searchParams Parámetros de la URL para filtros.
 * @returns {React.JSX.Element} La página de catálogo renderizada.
 */
export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : "All Items";

  const filteredProducts = mockProducts.filter(
    (product) => category === "All Items" || product.category === category
  );

  return (
    <>
      <TopNavBar />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl pt-24 md:pt-32 min-h-screen">
        
        {/* Header Section */}
        <header className="mb-lg text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-md border-b border-surface-container-high pb-md">
          <div className="w-full md:w-auto">
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-xs">
              Sacred Collection
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[576px] mx-auto md:mx-0">
              Discover our meticulously handcrafted items of devotion. Each piece is created with reverence, designed to bring peace and focus to your spiritual practice.
            </p>
          </div>

          {/* Filter Controls */}
          <CatalogFilters />
        </header>

        {/* Product Grid (Bento-style layout variations) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredProducts.map((product, index) => {
              // Apply variants based on index to match the mockup exactly
              let variant: "featured" | "vertical" | "icon" = "vertical";
              if (index === 0) variant = "featured";
              if (index === 4) variant = "icon";

              return (
                <CatalogCard 
                  key={product.id} 
                  product={product} 
                  variant={variant} 
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              No se encontraron productos en esta categoría.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-xl border-t border-surface-container-high pt-lg">
          <Pagination currentPage={1} totalPages={3} />
        </div>

      </main>

      <Footer />
    </>
  );
}
