import {
  ProductGallery,
  ProductBreadcrumb,
  ProductInfo,
  ProductSpecifications,
  RelatedProducts
} from "@/components/catalog";
import { getProductBySlug } from "@/actions/product.actions";
import { notFound } from "next/navigation";

/**
 * Componente de página de producto individual que muestra todos los detalles del producto,
 * incluyendo galería de imágenes, información, especificaciones y productos relacionados.
 *
 * @param {Object} params - Parámetros de la página.
 * @param {Promise<string>} params.slug - Parámetro asíncrono que representa el identificador único (slug) del producto.
 * @returns {Promise<React.JSX.Element>} La página del producto renderizada.
 */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="fade-in w-full pb-xl min-h-screen pt-20">
      <ProductBreadcrumb name={product.category || product.name} />

      {/* Product Hero Section */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pt-md pb-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter lg:gap-lg">
          {/* Product Image Gallery (Left) */}
          <ProductGallery
            images={product.imageUrls || []}
            altText={product.name}
            fallbackIcon={product.icon}
          />
          {/* Product Details (Right) */}
          <ProductInfo product={product} />
        </div>
      </section>

      <ProductSpecifications />
      <RelatedProducts currentProduct={product} />
    </main>
  );
}
