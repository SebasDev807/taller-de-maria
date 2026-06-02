import React from "react";
import Link from "next/link";

export const TopNavBar: React.FC = () => {
  return (
    <header className="bg-surface border-b border-surface-container-high fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-[1200px] mx-auto left-0 right-0">
      {/* Brand */}
      <Link href="/" className="font-headline-md text-headline-md text-primary tracking-tight transition-opacity hover:opacity-80">
        Taller De Maria
      </Link>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-gutter">
        <Link href="/" className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1 transition-all">
          Inicio
        </Link>
        <Link href="/catalog" className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-all">
          Productos
        </Link>
        <Link href="/about" className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-all">
          Sobre Nosotros
        </Link>
      </nav>

      {/* Trailing Icons */}
      <div className="flex items-center gap-base text-primary">
        <button className="p-2 hover:bg-surface-variant rounded-full transition-colors group">
          <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">person</span>
        </button>
        <button className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
          <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">notifications</span>
        </button>
        <button className="p-2 hover:bg-surface-variant rounded-full transition-colors group">
          <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">shopping_cart</span>
        </button>
        <Link href="/admin" className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
          <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">admin_panel_settings</span>
        </Link>
      </div>
    </header>
  );
};
