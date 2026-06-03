import Link from "next/link";

/**
 * Props for the ProductBreadcrumb component.
 */
interface ProductBreadcrumbProps {
  /**
   * The name of the product or its category to display in the breadcrumb.
   */
  name: string;
}

/**
 * Breadcrumb navigation for the product page.
 * Displays the path: Inicio > Catálogo > [Product Name]
 * 
 * @param props - Component props containing the product name.
 * @returns The rendered breadcrumb component.
 */
export const ProductBreadcrumb = ({ name }: ProductBreadcrumbProps) => {
  return (
    <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-sm mt-4">
      <nav aria-label="Breadcrumb" className="flex text-on-surface-variant font-label-sm text-label-sm">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link className="hover:text-primary transition-colors" href="/">Inicio</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
              <Link className="hover:text-primary transition-colors" href="/catalog">Catálogo</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
              <span className="text-primary font-medium">{name}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};
