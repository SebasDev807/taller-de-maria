"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useLogin } from "@/hooks";
import { mergeClassNames } from "@/helpers";
import { SearchInput } from "../../shared/SearchInput";

interface MobileNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const MobileNav = ({ isMenuOpen, setIsMenuOpen }: MobileNavProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { logout } = useLogin();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`fixed top-20 left-0 w-full bg-surface border-b border-surface-container-high z-40 transition-all duration-300 ease-in-out md:hidden overflow-hidden ${
        isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
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
  );
};
