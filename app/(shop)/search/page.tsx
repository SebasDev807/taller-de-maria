import { TopNavBar, Footer, CatalogCard, CatalogFilters } from "@/components";
import { mockProducts } from "@/lib/mockData";

/**
 * Página de búsqueda que muestra los resultados basados en la query de búsqueda (q)
 * y la categoría seleccionada (category).
 *
 * @param {Object} props
 * @param {Promise<{ [key: string]: string | string[] | undefined }>} props.searchParams Parámetros de la URL.
 * @returns {React.JSX.Element} La página de búsqueda renderizada.
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.toLowerCase() : "";
  const category = typeof params.category === "string" ? params.category : "All Items";

  const filteredProducts = mockProducts.filter((product) => {
    // Check search query using partial terms (must match all terms)
    const searchTerms = q.split(" ").filter(term => term.trim().length > 0);
    const matchesQuery = searchTerms.length === 0 || searchTerms.every(term =>
      product.name.toLowerCase().includes(term) ||
      (product.shortDescription && product.shortDescription.toLowerCase().includes(term))
    );

    // Check category filter
    const matchesCategory = category === "All Items" || product.category === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <>


      <main className="fade-in flex-grow w-full max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl pt-24 md:pt-32 min-h-[70vh]">

        <header className="mb-lg text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-md border-b border-surface-container-high pb-md">
          <div className="w-full md:w-auto">
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-xs">
              {q ? `Resultados para "${q}"` : "Búsqueda"}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[576px] mx-auto md:mx-0">
              {filteredProducts.length === 1
                ? "1 producto encontrado."
                : `${filteredProducts.length} productos encontrados.`}
            </p>
          </div>

          <CatalogFilters />
        </header>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredProducts.map((product) => (
              <CatalogCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <span className="material-symbols-outlined text-6xl text-surface-container-highest mb-4">search_off</span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">No se encontraron productos</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Intenta con otra palabra clave o quita los filtros activos.
            </p>
          </div>
        )}
      </main>


    </>
  );
}
