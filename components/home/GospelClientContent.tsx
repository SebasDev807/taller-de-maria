"use client";

import { useState } from "react";
import { ActionButton } from "./ActionButton";

interface GospelClientContentProps {
  title: string;
  text: string;
}

export const GospelClientContent = ({ title, text }: GospelClientContentProps) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 400;
  const isLongText = text.length > maxLength;

  const displayText = isExpanded || !isLongText ? text : text.substring(0, maxLength).trim() + "...";

  return (
    <>
      <h2 className="font-headline-lg text-headline-lg md:font-headline-lg-mobile md:text-headline-lg-mobile text-primary mb-6 before:content-['\22'] after:content-['\22']">
        {title}
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8 whitespace-pre-wrap">
        {displayText}
      </p>

      <div className="flex items-center justify-between gap-4 mt-auto flex-wrap">
        {isLongText ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 font-label-md text-label-md text-secondary hover:underline underline-offset-4 decoration-secondary transition-all group"
          >
            {isExpanded ? "Mostrar menos" : "Leer reflexión completa"}
            <span className={`material-symbols-outlined text-sm transition-transform ${isExpanded ? '' : 'group-hover:translate-x-1'}`}>
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
