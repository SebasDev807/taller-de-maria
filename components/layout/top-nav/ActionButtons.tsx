"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useLogin } from "@/hooks";
import { SearchInput } from "../../shared/SearchInput";
import { UserMenu } from "./UserMenu";
import { CartButton } from "./CartButton";

interface ActionButtonsProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const ActionButtons = ({ isMenuOpen, setIsMenuOpen }: ActionButtonsProps) => {
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { logout } = useLogin();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center gap-base text-primary">
      <SearchInput />

      {mounted && !user && (
        <Link href="/auth/login" title="Iniciar Sesión" className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
          <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">login</span>
        </Link>
      )}

      {mounted && user && <UserMenu />}

      <button title="Notificaciones" className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
        <span className="cursor-pointer material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">notifications</span>
      </button>

      <CartButton />

      {mounted && user?.role === "admin" && (
        <Link href="/admin" title="Panel de Control" className="p-2 hover:bg-surface-variant rounded-full transition-colors group hidden md:block">
          <span className="cursor-pointer material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">shield</span>
        </Link>
      )}

      {mounted && user && (
        <button title="Cerrar Sesión" onClick={() => logout()} className="p-2 hover:bg-error-container text-error rounded-full transition-colors group hidden md:block">
          <span className="cursor-pointer material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">logout</span>
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
  );
};
