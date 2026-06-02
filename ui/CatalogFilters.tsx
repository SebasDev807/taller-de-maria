"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, Suspense } from "react";

const FILTERS = ["All Items", "Rosarios", "Figuras", "Imágenes"];

/**
 * Contenido interno de los filtros que usa useSearchParams.
 */
const FiltersContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const active = searchParams.get("category") || "All Items";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "All Items") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => {
            router.push(pathname + "?" + createQueryString("category", filter));
          }}
          className={`px-4 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
            active === filter
              ? "bg-surface-container-high text-primary border border-outline-variant hover:bg-surface-variant"
              : "bg-surface text-on-surface-variant border border-surface-container-high hover:bg-surface-variant"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

/**
 * Componente de cliente para los controles de filtrado del catálogo.
 * Sincroniza la categoría seleccionada con los parámetros de la URL.
 * Envuelto en Suspense por el uso de useSearchParams.
 *
 * @returns {React.JSX.Element} Los controles de filtrado interactivos.
 */
export const CatalogFilters = () => {
  return (
    <div className="flex items-center gap-sm w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
      <Suspense fallback={<div className="h-10 w-full animate-pulse bg-surface-container-high rounded-full"></div>}>
        <FiltersContent />
      </Suspense>
    </div>
  );
};
