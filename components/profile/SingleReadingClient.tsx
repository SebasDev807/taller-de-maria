"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { unsaveReading } from '@/actions/savedReadings.actions';
import { mergeClassNames } from '@/helpers';

/**
 * Propiedades para el componente SingleReadingClient.
 */
interface SingleReadingClientProps {
  /** ID único de la lectura. */
  id: string;
  /** Tipo de la lectura (oración o evangelio). */
  type: "prayer" | "gospel";
  /** Título de la lectura, si existe. */
  title?: string;
  /** Texto completo de la lectura. */
  text: string;
  /** Referencia bíblica u origen de la lectura, si existe. */
  reference?: string;
  /** Fecha de creación en formato ISO string. */
  createdAt: string;
}

/**
 * Componente cliente para mostrar una lectura individual (oración o evangelio)
 * con opciones para compartir y eliminar.
 *
 * @param {SingleReadingClientProps} props - Propiedades de la lectura.
 * @returns {React.ReactElement} Componente interactivo de la lectura.
 */
export const SingleReadingClient: React.FC<SingleReadingClientProps> = ({
  id,
  type,
  title,
  text,
  reference,
  createdAt,
}) => {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const handleRemove = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta lectura?");
    if (!confirmDelete) return;

    setIsRemoving(true);
    const result = await unsaveReading(text, type);

    if (result.success) {
      router.push('/profile/readings');
      router.refresh();
    } else {
      setIsRemoving(false);
      alert(result.error || "Hubo un error al eliminar.");
    }
  };

  const handleShare = () => {
    alert("La funcionalidad de compartir estará disponible pronto.");
  };

  return (
    <article
      className={mergeClassNames(
        "content-item bg-surface-container-lowest p-lg soft-shadow rounded-xl border border-surface-container-low flex flex-col justify-between transition-all duration-300 w-full max-w-4xl mx-auto",
        type,
        isRemoving ? "opacity-50 pointer-events-none" : ""
      )}
    >
      <div>
        <div className="flex justify-between items-center mb-md border-b border-surface-container pb-sm">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-widest px-sm py-xs bg-secondary-fixed rounded-md">
            {type === 'gospel' ? 'Evangelio' : 'Oración'}
          </span>
          <span className="font-label-md text-label-md text-outline capitalize">{formattedDate}</span>
        </div>
        
        <h1 className="font-headline-xl text-headline-xl text-primary mb-lg text-center mt-md">
          {title || reference || (type === 'gospel' ? 'Evangelio' : 'Oración')}
        </h1>
        
        <div className="bg-surface p-md rounded-lg mb-xl">
          <p className={mergeClassNames(
            "font-body-lg text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap",
            type === 'gospel' ? 'italic text-center' : ''
          )}>
            {type === 'gospel' ? `"${text}"` : text}
          </p>
        </div>
      </div>
      
      <div className="flex justify-end items-center mt-xl pt-md border-t border-surface-container space-x-md">
        <button
          className="flex items-center font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors px-md py-sm rounded-lg hover:bg-surface-variant"
          title="Compartir (Próximamente)"
          onClick={handleShare}
          disabled={isRemoving}
        >
          <span className="material-symbols-outlined mr-sm text-[20px]" data-icon="share">share</span>
          Compartir
        </button>
        <button
          className="flex items-center font-label-md text-label-md text-error opacity-90 hover:opacity-100 transition-opacity px-md py-sm rounded-lg hover:bg-error-container disabled:opacity-50"
          onClick={handleRemove}
          disabled={isRemoving}
        >
          <span className="material-symbols-outlined mr-sm text-[20px]" data-icon="delete">delete</span>
          Eliminar Lectura
        </button>
      </div>
    </article>
  );
};
