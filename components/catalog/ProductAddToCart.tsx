"use client";

import { useState } from "react";
import { AddToCartButton } from "./AddToCartButton";
import { SerializedProduct } from "@/actions/types/product.types";

export const ProductAddToCart = ({ product }: { product: SerializedProduct }) => {

  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((quantity) => quantity + 1);
  const decrease = () => setQuantity((quantity) => Math.max(1, quantity - 1));

  return (
    <div className="flex items-center gap-sm">
      {/* Quantity Selector */}
      <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-lowest h-12 w-32">
        <button
          onClick={decrease}
          aria-label="Decrease quantity"
          className="w-10 h-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">remove</span>
        </button>
        <input
          aria-label="Quantity"
          className="w-full h-full text-center border-none bg-transparent font-label-md text-label-md text-primary focus:ring-0 p-0 m-0 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          min="1"
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(Math.max(1, parseInt(event.target.value) || 1))}
        />
        <button
          onClick={increase}
          aria-label="Increase quantity"
          className="w-10 h-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>
      {/* Add to Cart Button */}
      <div className="flex-1">
        <AddToCartButton variant="full" product={product} quantity={quantity} />
      </div>
    </div>
  );
};
