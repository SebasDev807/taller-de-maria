"use client";

import React, { useState } from 'react';
import { ReadingCard } from './ReadingCard';
import { unsaveReading } from '@/actions/savedReadings.actions';
import { mergeClassNames } from '@/helpers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Reading {
  _id: string;
  slug?: string;
  type: "prayer" | "gospel";
  title?: string;
  text: string;
  reference?: string;
  createdAt: string;
}

interface ProfilePrayersClientProps {
  initialReadings: Reading[];
}

export const ProfilePrayersClient: React.FC<ProfilePrayersClientProps> = ({ initialReadings }) => {
  const [readings, setReadings] = useState<Reading[]>(initialReadings);
  const [filter, setFilter] = useState<'all' | 'gospel' | 'prayer'>('all');
  const [removingId, setRemovingId] = useState<string | null>(null);
  const router = useRouter();

  const handleFilter = (type: 'all' | 'gospel' | 'prayer') => {
    setFilter(type);
  };

  const handleRemove = async (id: string, text: string, type: "prayer" | "gospel") => {
    // Optimistic remove animation trigger
    setRemovingId(id);

    setTimeout(async () => {
      // Remover del backend
      const result = await unsaveReading(text, type);

      if (result.success) {
        // Remover del estado local
        setReadings((prev) => prev.filter((r) => r._id !== id));
        router.refresh(); // Refresh para asegurar que la cache se limpie si es necesario
      } else {
        // Si falla, revertimos la animación
        setRemovingId(null);
        alert(result.error || "Hubo un error al eliminar.");
      }
    }, 300); // 300ms es el tiempo de la transición CSS duration-300
  };

  const filteredReadings = readings.filter(r => filter === 'all' || r.type === filter);

  return (
    <div className="fade-in w-full">
      {/* Filters/Tabs */}
      <div className="flex items-center space-x-lg border-b border-surface-container mb-lg">
        <button
          className={mergeClassNames(
            "cursor-pointer font-label-md text-label-md pb-base transition-all duration-300 outline-none focus:outline-none",
            filter === 'all' ? "border-b-2 border-secondary text-secondary" : "text-on-surface-variant hover:text-secondary"
          )}
          onClick={() => handleFilter('all')}
        >
          Todas
        </button>
        <button
          className={mergeClassNames(
            "cursor-pointer font-label-md text-label-md pb-base transition-all duration-300 outline-none focus:outline-none",
            filter === 'gospel' ? "border-b-2 border-secondary text-secondary" : "text-on-surface-variant hover:text-secondary"
          )}
          onClick={() => handleFilter('gospel')}
        >
          Evangelios
        </button>
        <button
          className={mergeClassNames(
            "cursor-pointer font-label-md text-label-md pb-base transition-all duration-300 outline-none focus:outline-none",
            filter === 'prayer' ? "border-b-2 border-secondary text-secondary" : "text-on-surface-variant hover:text-secondary"
          )}
          onClick={() => handleFilter('prayer')}
        >
          Oraciones
        </button>
      </div>

      {/* Content Grid */}
      {filteredReadings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredReadings.map((reading) => (
            <ReadingCard
              key={reading._id}
              id={reading._id}
              slug={reading.slug}
              type={reading.type}
              title={reading.title}
              text={reading.text}
              reference={reading.reference}
              createdAt={reading.createdAt}
              onRemove={handleRemove}
              isRemoving={removingId === reading._id}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-xl text-center space-y-md">
          <div className="w-48 h-48 rounded-full bg-surface-container-low flex items-center justify-center mb-md">
            <span className="material-symbols-outlined text-[64px] text-outline-variant" data-icon="potted_plant">
              potted_plant
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary">
            {filter === 'all' ? "Aún no has guardado plegarias" : `Aún no has guardado ${filter === 'gospel' ? 'evangelios' : 'oraciones'}`}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-[450px] mx-auto">
            Tu rincón de devoción está esperando. Explora nuestras lecturas diarias y guarda las que más resuenen en tu corazón.
          </p>
          <Link
            href="/"
            className="mt-md inline-block bg-secondary-container text-on-secondary-container px-lg py-sm rounded-full font-label-md text-label-md hover:shadow-lg transition-shadow"
          >
            Explorar Lecturas
          </Link>
        </div>
      )}
    </div>
  );
};
