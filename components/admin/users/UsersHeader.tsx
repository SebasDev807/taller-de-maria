import React from "react";

/**
 * Props for the UsersHeader component.
 */
interface UsersHeaderProps {
  /**
   * Title of the header, typically "Customers" or "Usuarios".
   */
  title: string;
  /**
   * Subtitle providing context to the user.
   */
  subtitle: string;
}

/**
 * Renders the header section for the Users management page.
 * Includes a search bar and an export button.
 *
 * @param {UsersHeaderProps} props - The properties passed to the component.
 * @returns {JSX.Element} The users header component.
 */
export const UsersHeader: React.FC<UsersHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-lg">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-primary">
          {title}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-full md:w-64">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            search
          </span>
          <input
            className="w-full bg-surface-container-lowest border-b border-outline outline-none py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-primary transition-colors focus:ring-0"
            placeholder="Buscar usuarios..."
            type="text"
          />
        </div>
        <button className="bg-secondary-container text-primary-container px-4 py-2 rounded flex items-center gap-2 hover:scale-95 transition-transform font-label-md text-label-md">
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            download
          </span>
          Exportar
        </button>
      </div>
    </header>
  );
};
