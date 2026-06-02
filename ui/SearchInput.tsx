"use client";

import { Suspense } from "react";
import { useSearch } from "@/hooks/useSearch";

/**
 * Componente interno de búsqueda con debounce y actualización dinámica.
 */
const SearchInputInner = ({ isMobile = false }: { isMobile?: boolean }) => {

  const { query, setQuery } = useSearch();

  return (
    <form
      onSubmit={(event) => { event.preventDefault(); }}
      className={`flex items-center bg-surface-variant rounded-full ${isMobile ? 'px-4 py-2 w-full mb-2' : 'hidden md:flex px-3 py-1.5'} focus-within:ring-2 ring-primary transition-all`}
    >
      <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-1">search</span>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={isMobile ? "Buscar productos..." : "Buscar..."}
        className={`bg-transparent border-none outline-none text-on-surface w-full ${!isMobile ? 'font-body-sm text-body-sm w-24 lg:w-40 focus:w-48' : 'font-body-md text-body-md'} transition-all placeholder:text-on-surface-variant`}
      />
    </form>
  );
};

export const SearchInput = ({ isMobile = false }: { isMobile?: boolean }) => {
  return (
    <Suspense fallback={
      <div className={`bg-surface-variant rounded-full animate-pulse ${isMobile ? 'w-full h-10 mb-2' : 'hidden md:block w-32 h-8'}`}></div>
    }>
      <SearchInputInner isMobile={isMobile} />
    </Suspense>
  );
};
