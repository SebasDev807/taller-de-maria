import Link from "next/link";
import { formatCurrency } from "@/helpers/format-currency";
import { getProductBySlug } from "@/actions/product.actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProductDetailActionsClient } from "@/components/admin/inventory";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  let stockStatus = "En Stock";
  let stockBadgeClass = "bg-secondary-container text-on-secondary-container";

  if (product.stock === 0) {
    stockStatus = "Agotado";
    stockBadgeClass = "bg-error-container text-error";
  } else if (product.stock <= 5) {
    stockStatus = "Bajo Stock";
    stockBadgeClass = "bg-[#FFE082]/20 text-[#604100]";
  }

  const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : null;

  return (
    <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen bg-surface">
      <div className="p-margin-mobile md:p-margin-desktop max-w-[1200px] mx-auto">
        {/* Navigation Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-lg">
          <div className="flex flex-col gap-sm">
            <Link
              href="/admin/inventario"
              className="flex w-fit items-center gap-xs text-on-surface-variant hover:text-secondary transition-soft group"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="font-label-md text-label-md">Volver al Inventario</span>
            </Link>
            <div className="flex items-center gap-base">
              <h2 className="font-headline-lg text-headline-lg text-primary">{product.name}</h2>
              <span className={`px-sm py-xs font-label-sm text-label-sm rounded-full ${stockBadgeClass}`}>
                {stockStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Content Grid (Bento Style) */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Left: Main Image and Actions */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-gutter">
            <div className="bg-surface-container-lowest shadow-sm rounded-xl overflow-hidden border border-surface-container-high relative min-h-[300px] flex items-center justify-center">
              {imageUrl ? (
                <Image
                  alt={product.name}
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                  src={imageUrl}
                  width={500}
                  height={500}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-on-surface-variant p-8">
                  <span className="material-symbols-outlined text-[64px] opacity-20">image</span>
                  <p className="mt-4 font-body-md">Sin imagen disponible</p>
                </div>
              )}
            </div>

            {/* Actions Card using Client Component for Edit/Delete */}
            <ProductDetailActionsClient product={product} />
          </div>

          {/* Right: Metadata and Description */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-gutter">
            {/* Metadata Grid */}
            <div className="bg-surface-container-lowest shadow-sm rounded-xl p-md grid grid-cols-1 md:grid-cols-3 gap-md border border-surface-container-high">
              <div className="flex flex-col gap-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant">SKU</span>
                <code className="font-label-md text-label-md bg-surface-container px-base py-xs rounded text-primary w-fit">
                  {product.sku || "N/A"}
                </code>
              </div>
              <div className="flex flex-col gap-xs overflow-hidden">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Slug</span>
                <span className="font-label-md text-label-md text-on-surface truncate" title={product.slug}>{product.slug}</span>
              </div>
              <div className="flex flex-col gap-xs overflow-hidden">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Categoría</span>
                <span className="px-sm py-xs bg-tertiary-container/10 text-on-tertiary-container font-label-sm text-label-sm border border-outline-variant/30 text-center rounded-lg truncate">
                  {product.category || "General"}
                </span>
              </div>
            </div>

            {/* Price and Stock Summary */}
            <div className="bg-surface-container-lowest shadow-sm rounded-xl p-md flex flex-wrap gap-4 items-center justify-between border-l-4 border-l-secondary border-y border-r border-y-surface-container-high border-r-surface-container-high">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Precio al Público</p>
                <p className="font-headline-md text-headline-md text-primary">{formatCurrency(product.price)}</p>
              </div>
              <div className="text-right">
                <p className="font-label-sm text-label-sm text-on-surface-variant">Existencias</p>
                <p className="font-headline-md text-headline-md text-on-surface">{product.stock} unidades</p>
              </div>
            </div>

            {/* Rich Text Description */}
            <div className="bg-surface-container-lowest shadow-sm rounded-xl p-md flex-1 border border-surface-container-high">
              <h3 className="font-label-md text-label-md text-primary border-b border-surface-container pb-base mb-md uppercase tracking-widest">
                Descripción del Producto
              </h3>
              <div className="font-body-md text-body-md text-on-surface-variant space-y-md leading-relaxed whitespace-pre-wrap">
                {product.description || "Este producto no tiene una descripción detallada."}

                {product.features && product.features.length > 0 && (
                  <>
                    <h4 className="font-label-md text-label-md text-primary mt-6 mb-2">Características Destacadas</h4>
                    <ul className="list-disc pl-md space-y-sm">
                      {product.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
