import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/mockData";
import { AddToCartButton } from "./AddToCartButton";

interface CatalogCardProps {
  product: Product;
  variant?: "featured" | "vertical" | "icon";
}

/**
 * Componente que representa una tarjeta de producto para la vista de catálogo,
 * soportando diferentes variantes visuales (destacado, vertical con imagen, o vertical con ícono).
 *
 * @param {CatalogCardProps} props - Propiedades de la tarjeta de catálogo.
 * @param {Product} props.product - El producto a mostrar.
 * @param {"featured" | "vertical" | "icon"} [props.variant="vertical"] - Variante de diseño.
 * @returns {React.JSX.Element} La tarjeta renderizada.
 */
export const CatalogCard = ({ product, variant = "vertical" }: CatalogCardProps) => {
  if (variant === "featured") {
    return (
      <article className="col-span-1 lg:col-span-2 bg-surface-container-lowest rounded-lg shadow-ambient overflow-hidden group flex flex-col md:flex-row h-full relative cursor-pointer">
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-surface-variant relative overflow-hidden">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          {product.badge && (
            <div className="absolute top-4 left-4 bg-secondary-fixed-dim text-on-secondary-fixed px-3 py-1 rounded-full font-label-sm text-label-sm z-20">
              {product.badge}
            </div>
          )}
        </div>
        <div className="p-md flex flex-col justify-between w-full md:w-1/2">
          <div>
            <h2 className="font-headline-lg text-headline-md text-primary mb-2">
              <Link href={`/catalog/${product.id}`} className="hover:underline before:absolute before:inset-0 before:z-10">
                {product.name}
              </Link>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3">
              {product.shortDescription}
            </p>
            <span className="block font-headline-md text-headline-md text-tertiary-container mb-md">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="relative z-20">
            <AddToCartButton variant="full" product={product} />
          </div>
        </div>
      </article>
    );
  }

  if (variant === "icon") {
    return (
      <article className="bg-surface-container-lowest rounded-lg shadow-ambient overflow-hidden group flex flex-col h-full relative cursor-pointer">
        <div className="w-full aspect-[4/5] bg-surface-variant relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-dim to-surface flex items-center justify-center">
            <span className="material-symbols-outlined text-[64px] text-outline-variant font-light">
              {product.icon || "import_contacts"}
            </span>
          </div>
          {product.badge && (
            <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm text-on-surface px-3 py-1 rounded-full font-label-sm text-label-sm border border-surface-container-high z-20">
              {product.badge}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="font-headline-md text-headline-md text-primary mb-1 text-lg">
            <Link href={`/catalog/${product.id}`} className="hover:underline before:absolute before:inset-0 before:z-10">
              {product.name}
            </Link>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-3 text-sm relative z-20 pointer-events-none">
            {product.shortDescription}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="font-headline-md text-headline-md text-tertiary-container text-xl">
              ${product.price.toFixed(2)}
            </span>
            <div className="relative z-20">
              <AddToCartButton variant="icon" product={product} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-surface-container-lowest rounded-lg shadow-ambient overflow-hidden group flex flex-col h-full relative cursor-pointer">
      <div className="w-full aspect-[4/5] bg-surface-variant relative overflow-hidden">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.imageAlt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {product.badge && (
          <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm text-on-surface px-3 py-1 rounded-full font-label-sm text-label-sm border border-surface-container-high z-20">
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-headline-md text-headline-md text-primary mb-1 text-lg">
          <Link href={`/catalog/${product.id}`} className="hover:underline before:absolute before:inset-0 before:z-10">
            {product.name}
          </Link>
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-3 text-sm relative z-20 pointer-events-none">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-headline-md text-headline-md text-tertiary-container text-xl">
            ${product.price.toFixed(2)}
          </span>
          <div className="relative z-20">
            <AddToCartButton variant="icon" product={product} />
          </div>
        </div>
      </div>
    </article>
  );
};
