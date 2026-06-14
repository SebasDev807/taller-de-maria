import Link from "next/link";
import { formatCurrency } from "@/helpers/format-currency";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  // En un caso real, buscaríamos el producto basado en el slug.
  // Aquí usamos datos mockeados para el diseño.
  const productPrice = 45000; // Ejemplo: 45000 pesos colombianos

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
              <h2 className="font-headline-lg text-headline-lg text-primary">Rosario de Madera de Olivo</h2>
              <span className="px-sm py-xs bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full">
                En Stock
              </span>
            </div>
          </div>
        </div>

        {/* Content Grid (Bento Style) */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Left: Main Image and Actions */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-gutter">
            <div className="bg-surface-container-lowest shadow-sm rounded-xl overflow-hidden border border-surface-container-high">
              <img
                alt="Rosario de madera de olivo hecho a mano"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApLzAeytesLZVs7mZlcHbs17nlgh-hrfV7GPyWXzUjVFR1fMxgW-A7GxIsoBKvhlO1xQh3wU5L-CpAoYEqeA-kFZInMMMyp4gPk7Ie9jc9RCu55HnbIKH4ucVbfpF2obXP_VpahCr_A4YdzIn1DSXMFRfzAnSGiWBkPaXJXJWj23QL_pwHmj0McW3gfh-ho5d9DXDohjIZrIqt6bXS4GlL8iKWsXc_mAnJ_TYh8frITI1vyhW4tk6aEChpDLc-xWH2b3H9UgrHZ7M"
              />
            </div>

            {/* Actions Card replacing Technical Specifications */}
            <div className="bg-surface-container-lowest shadow-sm rounded-xl p-md border border-surface-container-high flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 w-full px-md py-sm bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">edit</span>
                Editar Producto
              </button>
              <button className="flex items-center justify-center gap-2 w-full px-md py-sm border-2 border-error text-error font-label-md text-label-md rounded-lg hover:bg-error-container/20 active:scale-95 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">delete</span>
                Eliminar Producto
              </button>
            </div>
          </div>

          {/* Right: Metadata and Description */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-gutter">
            {/* Metadata Grid */}
            <div className="bg-surface-container-lowest shadow-sm rounded-xl p-md grid grid-cols-1 md:grid-cols-3 gap-md border border-surface-container-high">
              <div className="flex flex-col gap-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant">SKU</span>
                <code className="font-label-md text-label-md bg-surface-container px-base py-xs rounded text-primary w-fit">
                  RSY-001
                </code>
              </div>
              <div className="flex flex-col gap-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Slug</span>
                <span className="font-label-md text-label-md text-on-surface truncate">{params.slug}</span>
              </div>
              <div className="flex flex-col gap-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Categoría</span>
                <span className="px-sm py-xs bg-tertiary-container/10 text-on-tertiary-container font-label-sm text-label-sm border border-outline-variant/30 text-center rounded-lg">
                  Rosarios
                </span>
              </div>
            </div>

            {/* Price and Stock Summary */}
            <div className="bg-surface-container-lowest shadow-sm rounded-xl p-md flex flex-wrap gap-4 items-center justify-between border-l-4 border-l-secondary border-y border-r border-y-surface-container-high border-r-surface-container-high">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Precio al Público</p>
                <p className="font-headline-md text-headline-md text-primary">{formatCurrency(productPrice)} COP</p>
              </div>
              <div className="text-right">
                <p className="font-label-sm text-label-sm text-on-surface-variant">Existencias</p>
                <p className="font-headline-md text-headline-md text-on-surface">42 unidades</p>
              </div>
            </div>

            {/* Rich Text Description */}
            <div className="bg-surface-container-lowest shadow-sm rounded-xl p-md flex-1 border border-surface-container-high">
              <h3 className="font-label-md text-label-md text-primary border-b border-surface-container pb-base mb-md uppercase tracking-widest">
                Descripción del Producto
              </h3>
              <div className="font-body-md text-body-md text-on-surface-variant space-y-md leading-relaxed">
                <p>
                  Este rosario tradicional está meticulosamente tallado a mano por artesanos cristianos en Belén,
                  utilizando madera de olivo genuina de la región. Cada cuenta conserva las vetas naturales de la madera,
                  haciendo que cada pieza sea única e irrepetible.
                </p>
                <p>
                  La calidez de la madera y su aroma sutil invitan a la oración contemplativa y al recogimiento. El
                  diseño es minimalista pero robusto, unido por una cuerda de alta resistencia que garantiza
                  durabilidad a través de los años de devoción diaria.
                </p>
                <ul className="list-disc pl-md space-y-sm">
                  <li>Cuentas pulidas de 8mm para un tacto suave.</li>
                  <li>Crucifijo de madera tallado con detalle.</li>
                  <li>Empaque sustentable de lino incluido.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
