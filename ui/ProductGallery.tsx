"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  altText: string;
  fallbackIcon?: string;
}

export const ProductGallery = ({ images, altText, fallbackIcon }: ProductGalleryProps) => {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const hasImages = images && images.length > 0;
  const currentImage = hasImages ? images[selectedIndex] : null;

  return (
    <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-sm">
      {/* Main Image */}
      <div className="w-full aspect-[4/5] md:aspect-square bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden relative group">
        {currentImage ? (
          <Image
            alt={`${altText} - Imagen ${selectedIndex + 1}`}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            src={currentImage}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-variant text-outline-variant">
            <span className="material-symbols-outlined text-[64px]">{fallbackIcon || "image"}</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div className="flex gap-sm overflow-x-auto pb-2 scrollbar-hide">
          {images.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`cursor-pointer w-20 h-20 flex-shrink-0 bg-surface-container-lowest rounded-lg overflow-hidden relative transition-all border-2 ${selectedIndex === idx
                ? "border-secondary opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
                }`}
            >
              <Image
                alt={`Miniatura ${idx + 1}`}
                className="object-cover"
                src={imgUrl}
                fill
                sizes="80px"
              />
            </button>
          ))}
          <button className="w-20 h-20 flex-shrink-0 bg-surface-container-lowest rounded-lg border border-transparent overflow-hidden opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-full h-full bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined">zoom_in</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
