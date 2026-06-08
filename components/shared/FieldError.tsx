/**
 * Propiedades para el componente FieldError.
 */
interface FieldErrorProps {
    /** Identificador único para vincular el error con el campo via aria-describedby. */
    id: string;
    /** Mensaje de error a mostrar. Si es undefined el componente no se renderiza. */
    message?: string;
}

/**
 * Muestra un mensaje de error de validación para un campo de formulario.
 * No renderiza nada si no se provee un mensaje.
 *
 * @param props - Propiedades del componente.
 * @returns El mensaje de error o null.
 */
export const FieldError = ({ id, message }: FieldErrorProps) => {
    if (!message) return null;

    return (
        <p
            id={id}
            className="mt-1 text-sm text-error font-body-sm"
            role="alert"
        >
            {message}
        </p>
    );
};
