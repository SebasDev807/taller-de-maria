"use client";

import { useState } from "react";
import { useCart } from "@/store/shopping-cart";
import { SerializedProduct } from "@/actions/types/product.types";

interface AddToCartButtonProps {
  variant?: "icon" | "full";
  product?: SerializedProduct;
  quantity?: number;
}

/**
 * Componente de cliente para el botón de "Añadir al Carrito".
 * Maneja el estado local para mostrar un feedback visual (animación a "check")
 * tras ser pulsado, regresando a su estado original después de un breve periodo.
 * Agrega el producto al carrito global usando zustand.
 *
 * @param {AddToCartButtonProps} props - Propiedades del botón.
 * @param {"icon" | "full"} [props.variant="icon"] - Variante visual del botón.
 * @param {Product} [props.product] - Producto a agregar al carrito.
 * @param {number} [props.quantity] - Cantidad a agregar (por defecto 1).
 * @returns {React.JSX.Element} El botón interactivo de añadir al carrito.
 */
export const AddToCartButton = ({ variant = "icon", product, quantity = 1 }: AddToCartButtonProps) => {
  const [added, setAdded] = useState(false);
  const addItem = useCart(state => state.addItem);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        quantity: quantity,
        image: product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "",
        alt: product.name,
        stock: product.stock,
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleClick}
        className={`w-full font-label-md text-label-md py-3 rounded transition-all flex items-center justify-center gap-2 group-hover:bg-surface-container-low cursor-pointer ${
          added
            ? "bg-secondary-container text-on-secondary-container border border-secondary-container"
            : "bg-surface border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">
          {added ? "check" : "shopping_cart"}
        </span>
        {added ? "Añadido!" : "Añadir al carrito"}
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      onClick={handleClick}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all focus:outline-none cursor-pointer ${
        added
          ? "bg-secondary-container text-on-secondary-container border border-secondary-container"
          : "border border-outline-variant text-on-surface-variant hover:text-secondary hover:border-secondary"
      }`}
    >
      <span className="material-symbols-outlined text-[20px]">
        {added ? "check" : "add_shopping_cart"}
      </span>
    </button>
  );
};
