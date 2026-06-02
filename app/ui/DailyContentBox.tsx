import React from "react";
import Link from "next/link";
import { DailyContent } from "../lib/mockData";
import { ActionBtn } from "./ActionBtn";

interface DailyContentBoxProps {
  content: DailyContent;
}

export const DailyContentBox: React.FC<DailyContentBoxProps> = ({ content }) => {
  if (content.type === "evangelio") {
    return (
      <article className="col-span-1 lg:col-span-7 bg-[#FFFFFF] rounded-xl p-lg shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-center min-h-[400px]">
        <div className="relative z-10">
          <div className="flex items-center gap-sm mb-6 text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary">{content.icon}</span>
            <span className="font-label-md text-label-md uppercase tracking-wider">Evangelio del Día</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg md:font-headline-lg-mobile md:text-headline-lg-mobile text-primary mb-6">
            {content.title}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8">
            {content.text}
          </p>
          <Link 
            href={content.link || "#"}
            className="inline-flex items-center gap-2 font-label-md text-label-md text-secondary hover:text-secondary-fixed-dim transition-colors group"
          >
            Leer reflexión completa
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
        <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[300px]">auto_awesome</span>
        </div>
      </article>
    );
  }

  // type === 'oracion'
  return (
    <article className="col-span-1 lg:col-span-5 bg-surface-container-low rounded-xl p-lg flex flex-col justify-between min-h-[400px] border border-surface-container-highest">
      <div>
        <div className="flex items-center gap-sm mb-6 text-on-surface-variant">
          <span className="material-symbols-outlined text-secondary">{content.icon}</span>
          <span className="font-label-md text-label-md uppercase tracking-wider">Oración Diaria</span>
        </div>
        <p className="font-headline-md text-headline-md text-primary italic leading-relaxed mb-6">
          {content.title}
        </p>
      </div>
      <div className="mt-auto">
        <ActionBtn variant="secondary" icon="favorite">
          Guardar Oración
        </ActionBtn>
      </div>
    </article>
  );
};
