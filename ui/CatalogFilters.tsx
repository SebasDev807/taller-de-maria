"use client";

import { useState } from "react";

const FILTERS = ["All Items", "Rosarios", "Figuras", "Imágenes"];

/**
 * Componente de cliente para los controles de filtrado del catálogo.
 * Maneja visualmente qué filtro está seleccionado actualmente.
 *
 * @returns {React.JSX.Element} Los controles de filtrado interactivos.
 */
export const CatalogFilters = () => {
  const [active, setActive] = useState("All Items");

  return (
    <div className="flex items-center gap-sm w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
      <div className="flex gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
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
    </div>
  );
};
