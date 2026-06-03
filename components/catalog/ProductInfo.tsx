import { formatCurrency } from "@/helpers";
import { ProductAddToCart } from "@/components/catalog/ProductAddToCart";
import { Product } from "@/lib/mockData";

/**
 * Props for the ProductInfo component.
 */
interface ProductInfoProps {
  /**
   * The product object containing details like name, price, description, etc.
   */
  product: Product;
}

/**
 * Displays the product details including title, price, description, badges,
 * add to cart actions, and shipping info.
 * 
 * @param props - Component props containing the product data.
 * @returns The rendered product info component.
 */
export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="md:col-span-5 lg:col-span-4 flex flex-col pt-md md:pt-0">
      {(product.badge || product.isFeatured) && (
        <div className="flex gap-2 mb-sm">
          {product.badge && (
            <span className="inline-flex items-center px-2 py-1 rounded bg-[#FFE082] bg-opacity-20 text-secondary-container font-label-sm text-label-sm border border-secondary-container/30">
              {product.badge}
            </span>
          )}
          {product.isFeatured && (
            <span className="inline-flex items-center px-2 py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              Destacado
            </span>
          )}
        </div>
      )}
      <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-2">{product.name}</h1>
      <p className="font-headline-md text-headline-md text-primary mb-md">{formatCurrency(product.price)}</p>
      <div className="w-full h-[1px] bg-surface-container my-sm"></div>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
        {product.shortDescription || "Un producto artesanal creado con devoción."}
      </p>

      <div className="mt-auto flex flex-col gap-sm">
        <div className="flex items-center gap-sm">
          <ProductAddToCart product={product} />
        </div>
        <div className="flex items-center justify-center gap-2 text-on-surface-variant mt-2">
          <span className="material-symbols-outlined text-[16px]">local_shipping</span>
          <span className="font-label-sm text-label-sm">Envío gratis en compras mayores a {formatCurrency(100000)}</span>
        </div>
      </div>
    </div>
  );
};
