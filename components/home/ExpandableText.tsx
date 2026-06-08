"use client";

import { useState } from "react";

/**
 * Propiedades para el componente ExpandableText.
 */
interface ExpandableTextProps {
  /** Texto completo a mostrar. */
  text: string;
  /** Número máximo de caracteres antes de truncar. Por defecto 400. */
  maxLength?: number;
  /** Etiqueta del botón para expandir. Por defecto "Leer completo". */
  expandLabel?: string;
  /** Etiqueta del botón para contraer. Por defecto "Mostrar menos". */
  collapseLabel?: string;
  /** Clases CSS adicionales para el párrafo de texto. */
  textClassName?: string;
}

/**
 * Muestra un texto que puede expandirse o contraerse si supera `maxLength`.
 * Incluye un botón con icono para alternar el estado.
 *
 * @param props - Las propiedades del componente.
 * @returns El texto expandible renderizado.
 */
export const ExpandableText = ({
  text,
  maxLength = 400,
  expandLabel = "Leer completo",
  collapseLabel = "Mostrar menos",
  textClassName = "font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8 whitespace-pre-wrap",
}: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = text.length > maxLength;
  const displayText =
    isExpanded || !isLongText ? text : text.substring(0, maxLength).trim() + "...";

  return (
    <>
      <p className={textClassName}>{displayText}</p>

      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer inline-flex items-center gap-2 font-label-md text-label-md text-secondary underline-offset-4 decoration-secondary transition-all group"
        >
          {isExpanded ? collapseLabel : expandLabel}
          <span className="material-symbols-outlined text-sm transition-transform">
            {isExpanded ? "expand_less" : "arrow_forward"}
          </span>
        </button>
      )}
    </>
  );
};
