import { AdminPageHeader } from "@/components/admin";
import Image from "next/image";

export default function InventarioPage() {
  return (
    <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen bg-surface">
      {/* Header Section */}
      <div className="px-margin-mobile md:px-margin-desktop py-lg border-b border-surface-container-high bg-surface-container-lowest">
        <div className="max-w-[1200px] mx-auto">
          <AdminPageHeader 
            title="Gestión de Inventario" 
            description="Administra tu catálogo, rastrea niveles de stock, y actualiza detalles de productos."
            actionLabel="Nuevo Producto"
            actionIcon="add"
          />
        </div>
      </div>

      {/* Toolbar Section */}
      <div className="px-margin-mobile md:px-margin-desktop py-md max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary outline-none font-body-md text-body-md text-on-surface placeholder:text-outline transition-all" 
              placeholder="Buscar productos por nombre o SKU..." 
              type="text"
            />
          </div>
          {/* Filters */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button className="px-4 py-2 border border-outline-variant rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center gap-2 whitespace-nowrap hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>filter_list</span>
              Categoría
            </button>
            <button className="px-4 py-2 border border-outline-variant rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center gap-2 whitespace-nowrap hover:bg-surface-variant transition-colors">
              Estado
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-surface-container-lowest rounded-lg border border-surface-container-high shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-surface-container-high bg-surface">
                  <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider w-16">Imagen</th>
                  <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider">Nombre del Producto</th>
                  <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider">Categoría</th>
                  <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider">Nivel de Stock</th>
                  <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider text-right">Precio</th>
                  <th className="py-4 px-6 font-label-sm text-label-sm text-outline uppercase tracking-wider text-center w-20">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high font-body-md text-body-md text-on-surface">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-low transition-colors group">
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 rounded bg-surface-variant overflow-hidden border border-outline-variant/30">
                      <Image width={48} height={48} alt="Rosario de Madera" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD4Y0b1Yz--Hn_boEfoXA_36N9oOkue8BJ2uQGmz-GzBEvFokxbBAUS9hFPy8QAcRqOI1kFAnZQrbtEFT6ZXpdfb1vXXulTOjuJG-ullMuO7ltDky5beqaTsKu0GzBTmEtMdDVmVCg0vqCUlZvDC5DjJK0dK0ZcF26QN3Jhrc8an4lFJakehEgUUYRY9laWUIszBT8fPp0XsWRgKO9KA52-W4vR5mFePAbVt4BPguj07NnnVZ8fpC3m9M8e2SXsU_lJVtetw3hYHA"/>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-label-md text-label-md text-primary">Rosario de Madera de Olivo</p>
                    <p className="text-on-surface-variant text-sm mt-0.5">SKU: RSY-001</p>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">Rosarios</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>42 en stock</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-label-md text-label-md">$45.00</td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-outline hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>

                {/* Row 2 (Low Stock) */}
                <tr className="hover:bg-surface-container-low transition-colors group">
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 rounded bg-surface-variant overflow-hidden border border-outline-variant/30">
                      <Image width={48} height={48} alt="Colgante Crucifijo de Plata" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZyV4HQokUuCezCf9L92pSPf5v5uHIJyj-DVOL-rfkNPshG2FEs35c2Ml-XpabXJdHGE86HqDOh9ZbOIBuEsnZkRSrWKtmopf9YOYAqoktSiSEQdH3ezQUHj_CwEz3KehcE1t56m6ljtmwdr5j4l8hB4ssr3rUTxgSp_mJ-ybu7LgbeW4dfwuu0DltHvIwbJTLe9xbGKgaIpUSog_WTJ-xE79EaV7hvmf9Sig8FwBOo0iU86DeomvQWJlUymeQZd26rW3a15uuUx0"/>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-label-md text-label-md text-primary">Colgante Crucifijo de Plata</p>
                    <p className="text-on-surface-variant text-sm mt-0.5">SKU: PND-042</p>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">Joyería</td>
                  <td className="py-4 px-6">
                    <div className="inline-flex items-center gap-2 bg-[#FFE082]/20 text-[#604100] px-2 py-1 rounded">
                      <span className="w-2 h-2 rounded-full bg-[#FFE082]"></span>
                      <span className="font-label-sm text-label-sm">3 en stock (Bajo)</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-label-md text-label-md">$85.00</td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-outline hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-surface-container-low transition-colors group">
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 rounded bg-surface-variant overflow-hidden border border-outline-variant/30">
                      <Image width={48} height={48} alt="Vela de Devoción Mariana" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvRaFbvVJX0Wbh-xZMJ_a4Lln9ww0khI0loCYJT_wEqmy2y0pRnNlFbGoMovSnKf0dMEWgDXJ6RrZGlbL1r4lqo5Oi_XQ1TTERvZFfZdWgSgoblAink8EYyk1YWSHACmTj-RKz6siakRt4rm0zYQfXvV3Cj8orakAP8KGOyrkNlSAixXmAPtosOKD0Xkx3iD4L3KNOJw0izCv_wd5MN8OrgKE4Kf6BsZIEShi03xDHQNbXu_3rM9EbWfnzbnxmnzOzsE5qtvzO1J0"/>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-label-md text-label-md text-primary">Vela de Devoción Mariana</p>
                    <p className="text-on-surface-variant text-sm mt-0.5">SKU: CND-011</p>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">Velas</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>15 en stock</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-label-md text-label-md">$24.00</td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-outline hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>

                {/* Row 4 (Out of Stock) */}
                <tr className="hover:bg-surface-container-low transition-colors group bg-surface-dim/30">
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 rounded bg-surface-variant overflow-hidden border border-outline-variant/30 opacity-50">
                      <div className="w-full h-full bg-surface-variant flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline">image</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-label-md text-label-md text-outline">Estatua Pintada a Mano</p>
                    <p className="text-outline text-sm mt-0.5">SKU: STU-009</p>
                  </td>
                  <td className="py-4 px-6 text-outline">Estatuas</td>
                  <td className="py-4 px-6">
                    <div className="inline-flex items-center gap-2 bg-error-container/30 text-error px-2 py-1 rounded">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      <span className="font-label-sm text-label-sm">Agotado</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-label-md text-label-md text-outline">$120.00</td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-outline hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-surface-container-high bg-surface-container-lowest flex items-center justify-between">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Mostrando 1 a 4 de 128 productos</p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-outline hover:bg-surface-variant transition-colors disabled:opacity-50" disabled>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-outline hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
