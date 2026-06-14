import Link from 'next/link';

interface InventoryPaginationProps {
  currentPage: number;
  totalPages: number;
}

export const InventoryPagination = ({ currentPage, totalPages }: InventoryPaginationProps) => {
  return (
    <div className="px-6 py-4 border-t border-surface-container-high bg-surface-container-lowest flex items-center justify-between">
      <p className="font-label-sm text-label-sm text-on-surface-variant">Página {currentPage} de {totalPages}</p>
      <div className="flex items-center gap-2">
        {currentPage > 1 ? (
          <Link href={`?page=${currentPage - 1}`} className="cursor-pointer w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-outline hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
          </Link>
        ) : (
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-outline opacity-50 cursor-not-allowed" disabled>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
          </button>
        )}

        {currentPage < totalPages ? (
          <Link href={`?page=${currentPage + 1}`} className="cursor-pointer w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-outline hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
          </Link>
        ) : (
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-outline opacity-50 cursor-not-allowed" disabled>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
          </button>
        )}
      </div>
    </div>
  );
};
