"use client";

import { useState, useRef, useEffect } from "react";
import { FaRegImage } from "react-icons/fa";
import { getCategories } from "@/actions/category.actions";
import type { CategoryData } from "@/actions/types";

export interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductFormModal = ({ isOpen, onClose }: ProductFormModalProps) => {

  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      getCategories().then(res => {
        if (res.success) {
          setCategories(res.data);
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddFeature = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (featureToRemove: string) => {
    setFeatures(features.filter(f => f !== featureToRemove));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    // File drop handling can be added here later
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden mt-auto mb-auto md:my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-surface-container-high">
          <h2 className="text-headline-sm font-headline-sm text-primary">Agregar Nuevo Producto</h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-error transition-colors rounded-full p-1  cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Nombre del Producto */}
          <div>
            <label className="block text-label-lg font-label-lg text-on-surface mb-2">Nombre del producto</label>
            <input
              type="text"
              placeholder="Ej. Anillo de Compromiso Oro 18k"
              className="w-full bg-surface-container p-3 rounded-lg border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary text-body-lg"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-label-lg font-label-lg text-on-surface mb-2">Descripción del producto</label>
            <textarea
              rows={4}
              placeholder="Describe el producto, materiales, inspiración..."
              className="w-full bg-surface-container p-3 rounded-lg border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary text-body-lg resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categoría */}
            <div>
              <label className="block text-label-lg font-label-lg text-on-surface mb-2">Categoría</label>
              <div className="relative">
                <select className="w-full bg-surface-container p-3 rounded-lg border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary text-body-lg appearance-none cursor-pointer" defaultValue="">
                  <option value="" disabled>Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Características */}
            <div>
              <label className="block text-label-lg font-label-lg text-on-surface mb-2">Características añadibles</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={event => setFeatureInput(event.target.value)}
                  onKeyDown={event => event.key === 'Enter' && handleAddFeature(event)}
                  placeholder="Ej. Grabado personalizado"
                  className="flex-1 bg-surface-container p-3 rounded-lg border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary text-body-lg"
                />
                <button
                  onClick={handleAddFeature}
                  className="bg-secondary-container text-primary-container p-3 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>

              {/* Feature Pills */}
              {features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-surface-container-highest text-on-surface px-3 py-1 rounded-full text-label-md animate-in fade-in slide-in-from-bottom-2"
                    >
                      {feature}
                      <button
                        onClick={() => handleRemoveFeature(feature)}
                        className="hover:text-error transition-colors flex items-center cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Imagen (Drag & Drop) */}
          <div>
            <label className="block text-label-lg font-label-lg text-on-surface mb-2">Imagen del producto</label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-primary/40 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-surface-container hover:bg-surface-container-highest transition-colors cursor-pointer group"
            >
              <div className="text-on-surface p-4">
                <FaRegImage size={64} className="text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-body-lg font-medium text-on-surface">Haz clic para subir o arrastra la imagen aquí</p>
                <p className="text-body-sm text-on-surface-variant mt-1">PNG, JPG o WEBP (Máximo 5MB)</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-surface-container-high bg-surface-container flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-label-lg font-label-lg text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            className="px-6 py-2.5 rounded-lg text-label-lg font-label-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Agregar Producto
          </button>
        </div>
      </div>
    </div>
  );
};
