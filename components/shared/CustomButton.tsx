import { ButtonHTMLAttributes } from "react";

/**
 * Propiedades para el componente de botón personalizado.
 */
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

/**
 * Componente de botón personalizado que hereda las propiedades estándar de un botón HTML.
 *
 * @param props - Las propiedades estándar de un botón HTML.
 * @returns El componente CustomButton renderizado.
 */
export const CustomButton = ({ className, children, ...rest }: CustomButtonProps) => {
    return (
        <button
            {...rest}
            className={`bg-primary text-on-primary px-8 py-3 rounded hover:scale-95 transition-transform duration-200 font-label-md text-label-md cursor-pointer w-full sm:w-auto ${className || ""}`}
        >
            {children}
        </button>
    );
};