"use client";

import { ExpandableText } from "./ExpandableText";
import { SaveReadingButton } from "./SaveReadingButton";

/**
 * Propiedades para el componente GospelClientContent.
 */
interface GospelClientContentProps {
  /** El título del evangelio. */
  title: string;
  /** El texto o contenido principal del evangelio. */
  text: string;
  /** Referencia bíblica opcional del evangelio. */
  reference?: string;
  /** Si el evangelio está guardado por el usuario actual. */
  initialIsSaved: boolean;
}

/**
 * Componente de cliente que muestra el contenido del evangelio.
 * Delega la lógica de expansión al componente reutilizable `ExpandableText`.
 *
 * @param props Las propiedades del componente.
 * @returns El contenido renderizado del evangelio.
 */
export const GospelClientContent = ({ title, text, reference, initialIsSaved }: GospelClientContentProps) => {
  return (
    <>
      <h2 className="uppercase font-headline-lg text-headline-lg md:font-headline-lg-mobile md:text-headline-lg-mobile text-primary mb-2 before:content-['\22'] after:content-['\22']">
        {title}
      </h2>
      {reference && (
        <p className="font-label-md text-label-md text-secondary mb-6 italic">
          {reference}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 mt-auto flex-wrap">
        <ExpandableText
          text={text}
          expandLabel="Mostrar más"
          collapseLabel="Mostrar menos"
        />
        <SaveReadingButton
          title={title}
          text={text}
          reference={reference}
          type="gospel"
          initialIsSaved={initialIsSaved}
          className="w-auto px-6"
        />
      </div>
    </>
  );
};
