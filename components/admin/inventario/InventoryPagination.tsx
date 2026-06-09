export const InventoryPagination = () => {
  return (
    <div className="px-6 py-4 border-t border-surface-container-high bg-surface-container-lowest flex items-center justify-between">
      <p className="font-label-sm text-label-sm text-on-surface-variant">Mostrando 1 a 4 de 128 productos</p>
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-outline hover:bg-surface-variant transition-colors disabled:opacity-50" disabled>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-outline hover:bg-surface-variant transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
        </button>
      </div>
    </div>
  );
};
