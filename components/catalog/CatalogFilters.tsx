"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, Suspense } from "react";

/**
 * Contenido interno de los filtros que usa useSearchParams.
 */
const FiltersContent = ({ categories }: { categories: { id: string; name: string }[] }) => {
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
      <button
        onClick={() => {
          router.push(pathname + "?" + createQueryString("category", "All Items"));
        }}
        className={`px-4 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
          active === "All Items"
            ? "bg-surface-container-high text-primary border border-outline-variant hover:bg-surface-variant"
            : "bg-surface text-on-surface-variant border border-surface-container-high hover:bg-surface-variant"
        }`}
      >
        All Items
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => {
            router.push(pathname + "?" + createQueryString("category", cat.name));
          }}
          className={`px-4 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
            active === cat.name
              ? "bg-surface-container-high text-primary border border-outline-variant hover:bg-surface-variant"
              : "bg-surface text-on-surface-variant border border-surface-container-high hover:bg-surface-variant"
          }`}
        >
          {cat.name}
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
export const CatalogFilters = ({ categories = [] }: { categories?: { id: string; name: string }[] }) => {
  return (
    <div className="flex items-center gap-sm w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
      <Suspense fallback={<div className="h-10 w-full animate-pulse bg-surface-container-high rounded-full"></div>}>
        <FiltersContent categories={categories} />
      </Suspense>
    </div>
  );
};
