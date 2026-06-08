import React from "react";

interface ActionBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

/**
 * Componente de botón de acción reutilizable.
 * Permite configurar un ícono, variantes visuales (primario/secundario) y propiedades estándar de un botón HTML.
 *
 * @param {ActionBtnProps} props - Propiedades del componente ActionBtn.
 * @param {React.ReactNode} props.children - El contenido principal del botón.
 * @param {string} [props.icon] - Nombre del ícono opcional (Material Symbols) a mostrar junto al texto.
 * @param {"primary" | "secondary"} [props.variant="primary"] - Variante de estilo del botón.
 * @param {string} [props.className=""] - Clases CSS adicionales para personalizar el estilo.
 * @returns {React.JSX.Element} El botón renderizado.
 */
export const ActionButton = ({
  children,
  icon,
  variant = "primary",
  className = "",
  ...props
}: ActionBtnProps) => {
  const baseClasses = "flex justify-center items-center gap-2 font-label-md text-label-md py-3 rounded-lg transition-colors w-full";

  const variants = {
    primary: "bg-[#FFE082] text-[#3E2723] hover:bg-[#FFB300]", // Using accent colors from GUIDELINES
    secondary: "bg-[#FFFFFF] border border-outline-variant text-primary hover:bg-surface-variant"
  };

  return (
    <button
      className={`cursor-pointer ${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
      {children}
    </button>
  );
};
