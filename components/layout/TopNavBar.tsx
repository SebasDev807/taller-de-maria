"use client";

import { useState } from "react";
import Link from "next/link";
import { DesktopNav } from "./top-nav/DesktopNav";
import { ActionButtons } from "./top-nav/ActionButtons";
import { MobileNav } from "./top-nav/MobileNav";

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
        <DesktopNav />

        {/* Trailing Icons */}
        <ActionButtons isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      {/* Mobile Navigation Menu */}
      <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};
