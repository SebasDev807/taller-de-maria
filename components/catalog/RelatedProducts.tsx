import Link from "next/link";
import { CatalogCard } from "@/components/catalog/CatalogCard";
import { SerializedProduct } from "@/actions/types/product.types";
import { getRelatedProducts } from "@/actions/product.actions";

/**
 * Props for the RelatedProducts component.
 */
interface RelatedProductsProps {
  /**
   * The current product to exclude from the related products list.
   */
  currentProduct: SerializedProduct;
}

/**
 * Displays a list of related products to the user.
 * 
 * @param props - Component props containing the current product to exclude.
 * @returns The rendered related products component.
 */
export const RelatedProducts = async ({ currentProduct }: RelatedProductsProps) => {
  const relatedProducts = await getRelatedProducts(currentProduct.id, 4);

  if (!relatedProducts || relatedProducts.length === 0) {
    return null; // Return null if no related products
  }

  return (
    <section className="bg-surface-bright py-xl border-t border-surface-container">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-lg">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Te podría interesar</h2>
          <Link className="font-label-md text-label-md text-secondary hover:text-secondary-fixed transition-colors hidden md:block" href="/catalog">
            Ver Colección
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
          {relatedProducts.map((p, index) => (
            <div key={p.id} className={`${index === 2 ? 'hidden sm:block' : ''} ${index === 3 ? 'hidden md:block' : ''}`}>
              <CatalogCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
