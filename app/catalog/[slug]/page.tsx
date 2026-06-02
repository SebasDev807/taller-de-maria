import { TopNavBar, Footer, CatalogCard, ProductGallery, ProductAddToCart } from "@/ui";
import { mockProducts } from "@/lib/mockData";
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "@/ui/AddToCartButton";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/helpers";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params;
  const product = mockProducts.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  return (

    <main className="fade-in w-full pb-xl min-h-screen pt-20">

      {/* Breadcrumb */}
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
                <span className="text-primary font-medium">{product.category || product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Hero Section */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pt-md pb-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter lg:gap-lg">

          {/* Product Image Gallery (Left) */}
          <ProductGallery
            images={product.images || (product.imageUrl ? [product.imageUrl] : [])}
            altText={product.imageAlt || product.name}
            fallbackIcon={product.icon}
          />

          {/* Product Details (Right) */}
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
                {/* Quantity Selector */}
                <ProductAddToCart product={product} />
              </div>
              <div className="flex items-center justify-center gap-2 text-on-surface-variant mt-2">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                <span className="font-label-sm text-label-sm">Envío gratis en compras mayores a {formatCurrency(100000)}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Specifications Bento (Static) */}
      <section className="bg-surface-bright py-xl border-y border-surface-container">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-lg">Especificaciones del Producto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-ambient flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[32px] text-secondary mb-sm">forest</span>
              <h3 className="font-label-md text-label-md text-primary mb-xs uppercase tracking-widest text-[11px]">Materiales</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Materiales nobles<br />y auténticos</p>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-ambient flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[32px] text-secondary mb-sm">straighten</span>
              <h3 className="font-label-md text-label-md text-primary mb-xs uppercase tracking-widest text-[11px]">Dimensiones</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Diseño estándar<br />y ergonómico</p>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-ambient flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[32px] text-secondary mb-sm">public</span>
              <h3 className="font-label-md text-label-md text-primary mb-xs uppercase tracking-widest text-[11px]">Origen</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Hecho a mano<br />con devoción</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-surface-bright py-xl border-t border-surface-container">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-lg">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Te podría interesar</h2>
            <Link className="font-label-md text-label-md text-secondary hover:text-secondary-fixed transition-colors hidden md:block" href="/catalog">
              Ver Colección
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
            {mockProducts.filter(p => p.id !== product.id).slice(0, 4).map((p, index) => (
              <div key={p.id} className={`${index === 2 ? 'hidden sm:block' : ''} ${index === 3 ? 'hidden md:block' : ''}`}>
                <CatalogCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>



  );
}
