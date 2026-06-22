"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/store/shopping-cart";

export const CartButton = () => {
  const [mounted, setMounted] = useState(false);
  const totalCartItems = useCart((state) => state.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" title="Carrito" className="p-2 hover:bg-surface-variant rounded-full transition-colors group cursor-pointer relative text-secondary">
      <span className="material-symbols-outlined group-hover:scale-95 duration-200 ease-in-out">shopping_cart</span>
      {mounted && totalCartItems > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-container rounded-full"></span>
      )}
    </Link>
  );
};
