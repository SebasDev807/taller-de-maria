/**
 * Displays the page header for the admin dashboard, including
 * the main title and the primary action button to add a new product.
 *
 * @returns The rendered AdminPageHeader component.
 */
export interface AdminPageHeaderProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: string;
  onActionClick?: () => void;
}

export const AdminPageHeader = ({
  title = "Resumen de Gestión",
  description = "Bienvenido de vuelta. Aquí está el estado actual del taller.",
  actionLabel = "Nuevo Producto",
  actionIcon = "add",
  onActionClick,
}: AdminPageHeaderProps) => {
  return (
    <header className="mb-lg flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
      <div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">
          {title}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {description}
        </p>
      </div>
      <button 
        onClick={onActionClick}
        className="flex items-center justify-center gap-2 bg-secondary-container text-primary-container px-6 py-3 rounded hover:scale-95 transition-transform duration-200 cursor-pointer w-full sm:w-auto"
      >
        <span className="material-symbols-outlined text-[20px]">{actionIcon}</span>
        <span className="font-label-md text-label-md">{actionLabel}</span>
      </button>
    </header>
  );
};
