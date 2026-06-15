import React from 'react';
import { mergeClassNames } from '@/helpers';

interface ReadingCardProps {
  id: string;
  type: "prayer" | "gospel";
  title?: string;
  text: string;
  reference?: string;
  createdAt: string;
  onRemove: (id: string, text: string, type: "prayer" | "gospel") => void;
  isRemoving?: boolean;
}

export const ReadingCard: React.FC<ReadingCardProps> = ({
  id,
  type,
  title,
  text,
  reference,
  createdAt,
  onRemove,
  isRemoving = false
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <article
      className={mergeClassNames(
        "content-item bg-surface-container-lowest p-md soft-shadow rounded-lg border border-surface-container-low flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px]",
        type,
        isRemoving ? "opacity-0 scale-90 pointer-events-none" : ""
      )}
    >
      <div>
        <div className="flex justify-between items-start mb-base">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
            {type === 'gospel' ? 'Evangelio' : 'Oración'}
          </span>
          <span className="font-label-sm text-label-sm text-outline capitalize">{formattedDate}</span>
        </div>
        
        {/* Usamos el título si está, de lo contrario la referencia, y si no, un texto genérico */}
        <h3 className="font-headline-md text-headline-md text-primary mb-sm">
          {title || reference || (type === 'gospel' ? 'Evangelio' : 'Oración')}
        </h3>
        
        <p className={mergeClassNames(
          "font-body-md text-body-md text-on-surface-variant line-clamp-6",
          type === 'gospel' ? 'italic' : ''
        )}>
          {type === 'gospel' ? `"${text}"` : text}
        </p>
      </div>
      
      <div className="flex justify-end items-center mt-md pt-md border-t border-surface-container space-x-md">
        <button
          className="flex items-center font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
          title="Compartir (Próximamente)"
          onClick={() => alert("La funcionalidad de compartir estará disponible pronto.")}
        >
          <span className="material-symbols-outlined mr-xs text-[18px]" data-icon="share">share</span>
          Compartir
        </button>
        <button
          className="flex items-center font-label-sm text-label-sm text-error opacity-80 hover:opacity-100 transition-opacity disabled:opacity-50"
          onClick={() => onRemove(id, text, type)}
          disabled={isRemoving}
        >
          <span className="material-symbols-outlined mr-xs text-[18px]" data-icon="delete">delete</span>
          Remover
        </button>
      </div>
    </article>
  );
};
