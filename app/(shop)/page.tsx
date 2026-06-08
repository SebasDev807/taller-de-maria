import Link from "next/link";
import { TopNavBar, Footer, DailyContentBox, CatalogCard } from "@/components";
import { mockProducts, mockDailyContent } from "@/lib/mockData";

/**
 * Componente principal de la página de inicio (Home).
 * Renderiza la vista principal de la aplicación, combinando secciones como la cabecera (TopNavBar),
 * el Hero Section, el contenido devocional diario, los productos destacados y el pie de página (Footer).
 *
 * @returns {React.JSX.Element} La página de inicio renderizada.
 */
export default function Home() {

  const evangelio = mockDailyContent.find(content => content.type === "gospel");
  const oracion = mockDailyContent.find(content => content.type === "prayer");

  return (




    <main className="fade-in pt-20 pb-xl min-h-screen">

      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-24 text-center">
        <span className="font-label-md text-label-md text-secondary tracking-widest uppercase mb-4 block">
          Santuario Digital
        </span>
        <h1 className="font-headline-xl text-headline-xl md:text-[64px] leading-tight text-primary max-w-3xl mx-auto mb-lg">
          Paz y devoción en cada detalle.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[576px] mx-auto mb-12">
          Encuentra un momento de serenidad. Descubre nuestra colección de artículos artesanales creados con respeto y fe.
        </p>
      </section>

      {/* Spiritual Focus (Evangelio & Oración) - Bento Style Layout */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mb-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {evangelio && <DailyContentBox content={evangelio} />}
          {oracion && <DailyContentBox content={oracion} />}
        </div>
      </section>

      {/* Products Introduction */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-lg gap-4">
          <div>
            <h3 className="font-headline-lg text-headline-lg text-primary mb-2">Artesanía Sagrada</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Obras elaboradas a mano, diseñadas para acompañar tu fe.
            </p>
          </div>
          <Link
            href="/catalog"
            className="font-label-md text-label-md text-secondary hover:underline underline-offset-4 decoration-secondary transition-all"
          >
            Ver todo el catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {mockProducts.slice(0, 3).map((product, index) => (
            <div
              key={product.id}
              className={`${index === 2 ? 'md:hidden lg:block' : ''}`} // replicate the third item hiding on md
            >
              <CatalogCard product={product} />
            </div>
          ))}
        </div>
      </section>

    </main>


  );
}
