"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mergeClassNames } from "@/helpers";

export const DesktopNav = () => {
  const pathname = usePathname();

  return (
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
  );
};
