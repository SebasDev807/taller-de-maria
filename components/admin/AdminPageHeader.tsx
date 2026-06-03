/**
 * Displays the page header for the admin dashboard, including
 * the main title and the primary action button to add a new product.
 *
 * @returns The rendered AdminPageHeader component.
 */
export const AdminPageHeader = () => {
  return (
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
  );
};
