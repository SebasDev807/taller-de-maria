"use client";

import { useState } from "react";
import { ActionButton } from "./ActionButton";

interface GospelClientContentProps {
  title: string;
  text: string;
  reference?: string;
}

export const GospelClientContent = ({ title, text, reference }: GospelClientContentProps) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 400;
  const isLongText = text.length > maxLength;

  const displayText = isExpanded || !isLongText ? text : text.substring(0, maxLength).trim() + "...";

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
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8 whitespace-pre-wrap">
        {displayText}
      </p>

      <div className="flex items-center justify-between gap-4 mt-auto flex-wrap">
        {isLongText ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer inline-flex items-center gap-2 font-label-md text-label-md text-secondary underline-offset-4 decoration-secondary transition-all group"
          >
            {isExpanded ? "Mostrar menos" : "Leer reflexión completa"}
            <span className={`material-symbols-outlined text-sm transition-transform`}>
              {isExpanded ? "expand_less" : "arrow_forward"}
            </span>
          </button>
        ) : (
          <div /> // Spacer if there's no button
        )}

        <ActionButton variant="secondary" className="w-auto px-6" icon="favorite">
          Guardar Evangelio
        </ActionButton>
      </div>
    </>
  );
};
