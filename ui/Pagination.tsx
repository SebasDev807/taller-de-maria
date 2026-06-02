
interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

/**
 * Componente de paginación para navegar entre múltiples páginas de resultados.
 *
 * @param {PaginationProps} props - Propiedades del componente.
 * @param {number} [props.currentPage=1] - La página actual activa.
 * @param {number} [props.totalPages=5] - El número total de páginas.
 * @returns {React.JSX.Element} El componente de paginación renderizado.
 */
export const Pagination = ({ currentPage = 1, totalPages = 5 }: PaginationProps) => {
  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      {/* Botón Anterior */}
      <button
        disabled={currentPage <= 1}
        className="p-2 flex items-center justify-center rounded-full border border-surface-container-high text-on-surface-variant hover:border-secondary hover:text-secondary disabled:opacity-50 disabled:pointer-events-none transition-all"
        aria-label="Previous page"
      >
        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
      </button>

      {/* Páginas */}
      <div className="flex items-center gap-1 hidden sm:flex">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-label-md text-label-md transition-all ${isActive
                  ? "bg-secondary-container text-on-secondary-container font-bold border border-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary border border-transparent"
                }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Mobile Page indicator */}
      <div className="flex sm:hidden items-center justify-center px-4 font-label-md text-label-md text-on-surface-variant">
        Página {currentPage} de {totalPages}
      </div>

      {/* Botón Siguiente */}
      <button
        disabled={currentPage >= totalPages}
        className="p-2 flex items-center justify-center rounded-full border border-surface-container-high text-on-surface-variant hover:border-secondary hover:text-secondary disabled:opacity-50 disabled:pointer-events-none transition-all"
        aria-label="Next page"
      >
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </button>
    </nav>
  );
};
