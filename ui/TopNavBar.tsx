"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Componente interno de búsqueda con debounce y actualización dinámica.
 */
const SearchInputInner = ({ isMobile = false }: { isMobile?: boolean }) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  // Sincronizar el input con la URL si cambia externamente
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Debounce effect para buscar por tecla
  useEffect(() => {
    const handler = setTimeout(() => {
      // Solo hacer push si el usuario realmente cambió el valor
      if (query !== initialQuery) {
        const params = new URLSearchParams(searchParams.toString());
        if (query.trim()) {
          params.set("q", query);
        } else {
          params.delete("q");
        }
        router.push(`/search?${params.toString()}`);
      }
    }, 400); // 400ms delay

    return () => clearTimeout(handler);
  }, [query, router, searchParams, initialQuery]);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); }}
      className={`flex items-center bg-surface-variant rounded-full ${isMobile ? 'px-4 py-2 w-full mb-2' : 'hidden md:flex px-3 py-1.5'} focus-within:ring-2 ring-primary transition-all`}
    >
      <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-1">search</span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={isMobile ? "Buscar productos..." : "Buscar..."}
        className={`bg-transparent border-none outline-none text-on-surface w-full ${!isMobile ? 'font-body-sm text-body-sm w-24 lg:w-40 focus:w-48' : 'font-body-md text-body-md'} transition-all placeholder:text-on-surface-variant`}
      />
    </form>
  );
};

const SearchInput = ({ isMobile = false }: { isMobile?: boolean }) => {
  return (
    <Suspense fallback={
      <div className={`bg-surface-variant rounded-full animate-pulse ${isMobile ? 'w-full h-10 mb-2' : 'hidden md:block w-32 h-8'}`}></div>
    }>
      <SearchInputInner isMobile={isMobile} />
    </Suspense>
  );
};

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
          <button className="p-2 hover:bg-surface-variant rounded-full transition-colors group">
            <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">shopping_cart</span>
          </button>
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
