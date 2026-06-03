/**
 * Displays the static specifications of a product such as materials,
 * dimensions, and origin in a bento-style grid.
 * 
 * @returns The rendered product specifications component.
 */
export const ProductSpecifications = () => {
  return (
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
  );
};
