import { mockProducts, mockDailyContent } from "@/lib/mockData";

export default function AdminDashboard() {

  const evangelio = mockDailyContent.find((content) => content.type === "evangelio");
  const oracion = mockDailyContent.find((content) => content.type === "oracion");

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop min-h-screen">
      {/* Page Header */}
      <header className="mb-lg flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">
            Resumen de Gestión
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Bienvenido de vuelta. Aquí está el estado actual del taller.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-secondary-container text-primary-container px-6 py-3 rounded hover:scale-95 transition-transform duration-200 cursor-pointer w-full sm:w-auto">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span className="font-label-md text-label-md">Nuevo Producto</span>
        </button>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Widget 1: Daily Reflection (Spans 2 columns on large screens) */}
        <section className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col border border-surface-container-high">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_stories
            </span>
            <h3 className="font-headline-md text-[20px] text-primary font-bold">Reflexión Diaria</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* Evangelio Input */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="evangelio">
                Evangelio del Día
              </label>
              <textarea
                className="w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-body-md text-on-surface p-4 resize-none transition-colors rounded-t"
                id="evangelio"
                placeholder="Ingrese el texto del evangelio aquí..."
                rows={5}
                defaultValue={evangelio?.text || ""}
              />
            </div>

            {/* Oración Input */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="oracion">
                Oración del Día
              </label>
              <textarea
                className="w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 font-body-md text-body-md text-on-surface p-4 resize-none transition-colors rounded-t"
                id="oracion"
                placeholder="Ingrese la oración diaria aquí..."
                rows={5}
                defaultValue={oracion?.title || ""}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-primary text-on-primary px-8 py-3 rounded hover:scale-95 transition-transform duration-200 font-label-md text-label-md cursor-pointer w-full sm:w-auto">
              Actualizar Contenido
            </button>
          </div>
        </section>

        {/* Widget 2: Inventory Alerts */}
        <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col border border-surface-container-high">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
                warning
              </span>
              <h3 className="font-headline-md text-[20px] text-primary font-bold">Alertas de Stock</h3>
            </div>
            <span className="bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-1 rounded">
              3 Avisos
            </span>
          </div>

          <ul className="flex flex-col gap-4 flex-1">
            <li className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-error/20">
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">Rosario de Madera de Olivo</p>
                <p className="font-label-sm text-label-sm text-error mt-1">Agotado</p>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </li>

            <li className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-secondary-container/50">
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">Vela Aromática &apos;Paz&apos;</p>
                <p className="font-label-sm text-label-sm text-secondary mt-1">Quedan 2 unidades</p>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </li>

            <li className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-secondary-container/50">
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">Medalla Milagrosa Plata</p>
                <p className="font-label-sm text-label-sm text-secondary mt-1">Quedan 5 unidades</p>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </li>
          </ul>

          <a className="mt-6 text-center font-label-md text-label-md text-secondary hover:underline underline-offset-4" href="#">
            Ver Inventario Completo
          </a>
        </section>

        {/* Widget 3: Quick CRUD - Recent Products (Spans 2 columns on large screens) */}
        <section className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-surface-container-high">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline-md text-[20px] text-primary font-bold">Productos Recientes</h3>
            <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
              <span className="font-label-sm text-label-sm">Ver Todos</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-surface-container-high">
                  <th className="py-4 font-label-md text-label-md text-on-surface-variant font-normal">Producto</th>
                  <th className="py-4 font-label-md text-label-md text-on-surface-variant font-normal">Categoría</th>
                  <th className="py-4 font-label-md text-label-md text-on-surface-variant font-normal">Precio</th>
                  <th className="py-4 font-label-md text-label-md text-on-surface-variant font-normal text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md text-on-surface divide-y divide-surface-container-high">
                {mockProducts.slice(0, 4).map((product) => (
                  <tr key={product.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 flex items-center gap-3">
                      {product.imageUrl ? (
                        <div className="w-10 h-10 bg-surface-variant rounded overflow-hidden flex items-center justify-center border border-outline-variant relative">
                          <img
                            alt={product.name}
                            className="w-full h-full object-cover"
                            src={product.imageUrl}
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-surface-variant rounded flex items-center justify-center border border-outline-variant">
                          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                            {product.icon || "image"}
                          </span>
                        </div>
                      )}
                      <span className="font-medium text-primary">{product.name}</span>
                    </td>
                    <td className="py-4 text-on-surface-variant">{product.category || "General"}</td>
                    <td className="py-4 font-semibold">{formatPrice(product.price)}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-on-surface-variant hover:text-primary cursor-pointer">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button className="p-1 text-on-surface-variant hover:text-error cursor-pointer">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Widget 4: Quick CRUD - Categories */}
        <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-surface-container-high">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline-md text-[20px] text-primary font-bold">Categorías</h3>
            <button className="text-secondary hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
          </div>

          <ul className="flex flex-col gap-1">
            {[
              "Rosarios y Devocionales",
              "Arte Sacro",
              "Libros y Biblias",
              "Velas y Aromas",
            ].map((category, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 rounded hover:bg-surface-container-low transition-colors group border-b border-surface-container-high last:border-0"
              >
                <span className="font-body-md text-body-md text-on-surface">{category}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-on-surface-variant hover:text-primary cursor-pointer p-1">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
