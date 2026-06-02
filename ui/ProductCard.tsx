import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/mockData";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="group block bg-[#FFFFFF] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-300 h-full"
    >
      <div className="aspect-square bg-surface-container-low overflow-hidden relative">
        <img
          src={product.imageUrl}
          alt={product.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        {product.badge && (
          <div className="absolute top-4 left-4 bg-[#FFE082] text-[#3E2723] px-3 py-1 rounded-full font-label-sm text-label-sm shadow-sm">
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <h4 className="font-headline-md text-headline-md text-primary mb-2">
          {product.name}
        </h4>
        <p className="font-body-md text-body-md text-secondary font-semibold">
          € {product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};
