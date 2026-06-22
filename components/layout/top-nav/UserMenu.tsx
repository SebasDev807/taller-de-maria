"use client";

import Link from "next/link";

export const UserMenu = () => {
  return (
    <div className="relative group hidden md:block">
      <button title="Mi Perfil" className="p-2 hover:bg-surface-variant rounded-full transition-colors cursor-pointer flex items-center justify-center">
        <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">person</span>
      </button>
      <div className="absolute right-0 top-full pt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="bg-surface border border-surface-container-high rounded-xl shadow-lg flex flex-col py-2 overflow-hidden">
          <Link href="/profile/settings" className="px-4 py-3 hover:bg-surface-variant text-on-surface transition-colors font-label-md flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Configuración
          </Link>
          <Link href="/profile/readings" className="px-4 py-3 hover:bg-surface-variant text-on-surface transition-colors font-label-md flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
            Mis lecturas
          </Link>
          <Link href="/profile/orders" className="px-4 py-3 hover:bg-surface-variant text-on-surface transition-colors font-label-md flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            Historial de compras
          </Link>
        </div>
      </div>
    </div>
  );
};
