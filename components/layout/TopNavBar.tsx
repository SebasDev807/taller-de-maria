"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchInput } from "../shared/SearchInput";
import { useCart } from "@/store/shopping-cart";
import { useAuthStore } from "@/store/auth";
import { useLogin } from "@/hooks";
import { usePathname } from "next/navigation";
import { mergeClassNames } from "@/helpers";

/**
 * Componente TopNavBar que representa la barra de navegación superior principal.
 * Incluye el logotipo, enlaces de navegación de escritorio, íconos de acciones y un menú responsivo para dispositivos móviles.
 *
 * @returns {React.JSX.Element} La barra de navegación superior renderizada.
 */
export const TopNavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCartItems = useCart((state) => state.totalItems());
  const user = useAuthStore((state) => state.user);
  const { logout } = useLogin();

  return (
    <>
      <header className="bg-surface border-b border-surface-container-high fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-[1200px] mx-auto left-0 right-0">
        {/* Brand */}
        <Link href="/" className="font-headline-md text-headline-md text-primary tracking-tight transition-opacity hover:opacity-80">
          Taller De Maria
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-gutter">
          <Link href="/" title="Inicio" className={mergeClassNames("font-label-md text-label-md transition-all duration-300 pb-1", pathname === "/" ? "text-secondary-fixed-dim border-b-2 border-secondary-fixed-dim" : "text-on-surface-variant hover:text-secondary-fixed-dim")}>
            Inicio
          </Link>
          <Link href="/catalog" title="Productos" className={mergeClassNames("font-label-md text-label-md transition-all duration-300 pb-1", pathname.startsWith("/catalog") ? "text-secondary-fixed-dim border-b-2 border-secondary-fixed-dim" : "text-on-surface-variant hover:text-secondary-fixed-dim")}>
            Productos
          </Link>
          <Link href="/about" title="Sobre Nosotros" className={mergeClassNames("font-label-md text-label-md transition-all duration-300 pb-1", pathname === "/about" ? "text-secondary-fixed-dim border-b-2 border-secondary-fixed-dim" : "text-on-surface-variant hover:text-secondary-fixed-dim")}>
            Sobre Nosotros
          </Link>
        </nav>

        {/* Trailing Icons */}
        <div className="flex items-center gap-base text-primary">
          <SearchInput />
          {mounted && !user && (
            <Link href="/auth/login" title="Iniciar Sesión" className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
              <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">login</span>
            </Link>
          )}
          {mounted && user && (
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
                  <Link href="/profile/prayers" className="px-4 py-3 hover:bg-surface-variant text-on-surface transition-colors font-label-md flex items-center gap-3">
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
          )}
          <button title="Notificaciones" className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
            <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">notifications</span>
          </button>
          <Link href="/cart" title="Carrito" className="p-2 hover:bg-surface-variant rounded-full transition-colors group cursor-pointer relative text-secondary">
            <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">shopping_cart</span>
            {mounted && totalCartItems > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-container rounded-full"></span>
            )}
          </Link>
          {mounted && user?.role === "admin" && (
            <Link href="/admin" title="Panel de Control" className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
              <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">shield</span>
            </Link>
          )}
          {mounted && user && (
            <button title="Cerrar Sesión" onClick={() => logout()} className="p-2 hover:bg-error-container text-error rounded-full transition-colors group hidden md:block">
              <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">logout</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-surface-variant rounded-full transition-colors group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            title="Menú"
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
            title="Inicio"
            className={mergeClassNames("font-label-md text-label-lg transition-colors duration-300", pathname === "/" ? "text-secondary-fixed-dim font-bold" : "text-on-surface hover:text-secondary-fixed-dim")}
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/catalog"
            title="Productos"
            className={mergeClassNames("font-label-md text-label-lg transition-colors duration-300", pathname.startsWith("/catalog") ? "text-secondary-fixed-dim font-bold" : "text-on-surface hover:text-secondary-fixed-dim")}
            onClick={() => setIsMenuOpen(false)}
          >
            Productos
          </Link>
          <Link
            href="/about"
            title="Sobre Nosotros"
            className={mergeClassNames("font-label-md text-label-lg transition-colors duration-300", pathname === "/about" ? "text-secondary-fixed-dim font-bold" : "text-on-surface hover:text-secondary-fixed-dim")}
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre Nosotros
          </Link>

          <div className="h-[1px] w-full bg-surface-container-high my-2" />

          {mounted && !user && (
            <Link href="/auth/login" title="Iniciar Sesión" className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors text-left" onClick={() => setIsMenuOpen(false)}>
              <span className="material-symbols-outlined">login</span>
              <span className="font-label-md text-label-lg">Iniciar Sesión</span>
            </Link>
          )}
          {mounted && user && (
            <button title="Mi Perfil" className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors text-left" onClick={() => setIsMenuOpen(false)}>
              <span className="material-symbols-outlined">person</span>
              <span className="font-label-md text-label-lg">Mi Perfil</span>
            </button>
          )}
          <button title="Notificaciones" className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors text-left" onClick={() => setIsMenuOpen(false)}>
            <span className="material-symbols-outlined">notifications</span>
            <span className="font-label-md text-label-lg">Notificaciones</span>
          </button>
          {mounted && user?.role === "admin" && (
            <Link href="/admin" title="Panel de Control" className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              <span className="material-symbols-outlined">shield</span>
              <span className="font-label-md text-label-lg">Panel de Control</span>
            </Link>
          )}
          {mounted && user && (
            <button title="Cerrar Sesión" onClick={() => { logout(); setIsMenuOpen(false); }} className="flex items-center gap-3 text-error hover:text-error-container transition-colors text-left">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-md text-label-lg">Cerrar Sesión</span>
            </button>
          )}
        </nav>
      </div>
    </>
  );
};
