import React from 'react';

export const InventoryToolbar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      {/* Search */}
      <div className="relative w-full md:w-96">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
        <input 
          className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary outline-none font-body-md text-body-md text-on-surface placeholder:text-outline transition-all" 
          placeholder="Buscar productos por nombre o SKU..." 
          type="text"
        />
      </div>
      {/* Filters */}
      <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        <button className="px-4 py-2 border border-outline-variant rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center gap-2 whitespace-nowrap hover:bg-surface-variant transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>filter_list</span>
          Categoría
        </button>
        <button className="px-4 py-2 border border-outline-variant rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center gap-2 whitespace-nowrap hover:bg-surface-variant transition-colors">
          Estado
        </button>
      </div>
    </div>
  );
};
