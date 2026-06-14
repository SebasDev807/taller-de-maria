import Image from "next/image";
import Link from "next/link";
import { SerializedProduct } from "@/actions/types/product.types";
import { formatCurrency } from "@/helpers";

interface ProductCardProps {
  product: SerializedProduct;
}

/**
 * Componente que representa una tarjeta de producto individual.
 * Muestra información esencial del producto como imagen, nombre y precio.
 * Incluye efectos de hover y badges para destacar productos (ej: "Nuevo").
 *
 * @param {ProductCardProps} props - Propiedades del componente ProductCard.
 * @param {Product} props.product - El objeto Product con los datos a mostrar.
 * @returns {React.JSX.Element} La tarjeta del producto renderizada.
 */
export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group block bg-[#FFFFFF] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-300 h-full"
    >
      <div className="aspect-square bg-surface-container-low overflow-hidden relative">
        <Image
          src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "/placeholder.jpg"}
          alt={product.name || "Product image"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          {formatCurrency(product.price)}
        </p>
      </div>
    </Link>
  );
};
