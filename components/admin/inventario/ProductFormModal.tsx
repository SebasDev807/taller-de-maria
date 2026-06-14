"use client";

import { useState, useRef, useEffect } from "react";
import { FaRegImage } from "react-icons/fa";
import { getCategories } from "@/actions/category.actions";
import { createProduct } from "@/actions/product.actions";
import type { CategoryData } from "@/actions/types";
import Image from "next/image";

export interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductFormModal = ({ isOpen, onClose }: ProductFormModalProps) => {

  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      getCategories().then(res => {
        if (res.success) {
          setCategories(res.data);
        }
      });
      // Reset form state on open
      setFeatures([]);
      setFile(null);
      setPreview(null);
      setError(null);
      setIsSubmitting(false);
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
    
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFile(event.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError("Por favor, sube solo archivos de imagen (PNG, JPG, WEBP).");
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      
      // Upload image to Cloudinary first
      let imageUrls: string[] = [];
      
      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        
        const uploadResult = await uploadRes.json();
        
        if (!uploadRes.ok) {
          throw new Error(uploadResult.error || "Error al subir la imagen");
        }
        
        if (uploadResult.secure_url) {
          imageUrls.push(uploadResult.secure_url);
        }
      }

      // Add features and imageUrls to formData for createProduct
      formData.append("features", JSON.stringify(features));
      formData.append("imageUrls", JSON.stringify(imageUrls));

      const result = await createProduct(formData);

      if (result.success) {
        onClose();
      } else {
        setError(result.error || "Ocurrió un error al crear el producto.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado al crear el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden mt-auto mb-auto md:my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-surface-container-high">
          <h2 className="text-headline-sm font-headline-sm text-primary">Agregar Nuevo Producto</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-error transition-colors rounded-full p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-error/10 text-error p-3 rounded-lg text-body-md border border-error/20">
              {error}
            </div>
          )}
          
          {/* Nombre del Producto */}
          <div>
            <label className="block text-label-lg font-label-lg text-on-surface mb-2">Nombre del producto *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Ej. Anillo de Compromiso Oro 18k"
              className="w-full bg-surface-container p-3 rounded-lg border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary text-body-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Precio */}
            <div>
              <label className="block text-label-lg font-label-lg text-on-surface mb-2">Precio (COP) *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                placeholder="Ej. 150000"
                className="w-full bg-surface-container p-3 rounded-lg border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary text-body-lg"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-label-lg font-label-lg text-on-surface mb-2">Inventario (Stock) *</label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                defaultValue="0"
                className="w-full bg-surface-container p-3 rounded-lg border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary text-body-lg"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-label-lg font-label-lg text-on-surface mb-2">Descripción del producto</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe el producto, materiales, inspiración..."
              className="w-full bg-surface-container p-3 rounded-lg border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary text-body-lg resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categoría */}
            <div>
              <label className="block text-label-lg font-label-lg text-on-surface mb-2">Categoría *</label>
              <div className="relative">
                <select 
                  name="category"
                  required
                  className="w-full bg-surface-container p-3 rounded-lg border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary text-body-lg appearance-none cursor-pointer" 
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
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
              className="border-2 border-dashed border-primary/40 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-surface-container hover:bg-surface-container-highest transition-colors cursor-pointer group relative overflow-hidden"
            >
              {preview ? (
                <div className="relative w-full h-40">
                  <Image 
                    src={preview} 
                    alt="Preview" 
                    fill 
                    className="object-contain" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">Cambiar imagen</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-on-surface p-4">
                    <FaRegImage size={64} className="text-gray-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-body-lg font-medium text-on-surface">Haz clic para subir o arrastra la imagen aquí</p>
                    <p className="text-body-sm text-on-surface-variant mt-1">PNG, JPG o WEBP (Máximo 5MB)</p>
                  </div>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-surface-container-high bg-surface-container flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg text-label-lg font-label-lg text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg text-label-lg font-label-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
                Guardando...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                Agregar Producto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
