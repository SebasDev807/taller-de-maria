"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";

/**
 * Componente TopNavBar que representa la barra de navegación superior principal.
 * Incluye el logotipo, enlaces de navegación de escritorio, íconos de acciones y un menú responsivo para dispositivos móviles.
 *
 * @returns {React.JSX.Element} La barra de navegación superior renderizada.
 */
export const TopNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
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
          <SearchInput />
          <button className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
            <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">person</span>
          </button>
          <button className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
            <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">notifications</span>
          </button>
          <Link href="/cart" className="p-2 hover:bg-surface-variant rounded-full transition-colors group cursor-pointer">
            <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">shopping_cart</span>
          </Link>
          <Link href="/admin" className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
            <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">admin_panel_settings</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-surface-variant rounded-full transition-colors group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-20 left-0 w-full bg-surface border-b border-surface-container-high z-40 transition-all duration-300 ease-in-out md:hidden overflow-hidden ${isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="flex flex-col px-margin-mobile py-4 gap-4">
          <SearchInput isMobile={true} />
          <Link
            href="/"
            className="font-label-md text-label-lg text-on-surface hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/catalog"
            className="font-label-md text-label-lg text-on-surface hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Productos
          </Link>
          <Link
            href="/about"
            className="font-label-md text-label-lg text-on-surface hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre Nosotros
          </Link>

          <div className="h-[1px] w-full bg-surface-container-high my-2" />

          <button className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors text-left" onClick={() => setIsMenuOpen(false)}>
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-md text-label-lg">Mi Perfil</span>
          </button>
          <button className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors text-left" onClick={() => setIsMenuOpen(false)}>
            <span className="material-symbols-outlined">notifications</span>
            <span className="font-label-md text-label-lg">Notificaciones</span>
          </button>
          <Link href="/admin" className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span className="font-label-md text-label-lg">Panel de Control</span>
          </Link>
        </nav>
      </div>
    </>
  );
};
