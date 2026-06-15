"use client";

import { useState, useRef, useEffect } from "react";
import { ActionButton } from "./ActionButton";
import { saveReading, unsaveReading } from "@/actions/savedReadings.actions";

interface SaveReadingButtonProps {
  title?: string;
  text: string;
  reference?: string;
  type: "prayer" | "gospel";
  initialIsSaved: boolean;
  className?: string;
}

export const SaveReadingButton = ({
  title,
  text,
  reference,
  type,
  initialIsSaved,
  className,
}: SaveReadingButtonProps) => {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isLoading, setIsLoading] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const successMessageTimer = useRef<NodeJS.Timeout | null>(null);

  // Limpiar timers al desmontar
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      if (successMessageTimer.current) clearTimeout(successMessageTimer.current);
    };
  }, []);

  const performToggleSave = async () => {
    try {
      if (isSaved) {
        const result = await unsaveReading(text, type);
        if (result.success) {
          setIsSaved(false);
          setJustSaved(false); // Por si acaso
        } else {
          alert(result.error);
        }
      } else {
        const result = await saveReading({ title, text, reference, type });
        if (result.success) {
          setIsSaved(true);
          setJustSaved(true);

          // Mostrar mensaje de éxito por 2 segundos
          if (successMessageTimer.current) clearTimeout(successMessageTimer.current);
          successMessageTimer.current = setTimeout(() => {
            setJustSaved(false);
          }, 2000);
        } else {
          alert(result.error);
        }
      }
    } catch (error) {
      console.error("Error toggling save state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSave = () => {
    if (isLoading) return;
    
    // Mostramos estado de carga de inmediato
    setIsLoading(true);

    // Debounce para evitar múltiples llamadas rápidas
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performToggleSave();
    }, 400); // 400ms de debounce
  };

  const label = type === "prayer" ? "Oración" : "Evangelio";

  // Determinar texto e icono según el estado
  let buttonText = "";
  let buttonIcon = "";

  if (isLoading && !justSaved) {
    buttonText = "Procesando...";
    buttonIcon = "sync"; // Opcional, podría ser un icono de carga si tuviéramos
  } else if (justSaved) {
    buttonText = `${label} Guardada`;
    buttonIcon = "check_circle";
  } else if (isSaved) {
    buttonText = `Eliminar ${label}`;
    buttonIcon = "favorite";
  } else {
    buttonText = `Guardar ${label}`;
    buttonIcon = "favorite_border";
  }

  return (
    <ActionButton
      variant="secondary"
      className={`${className} transition-all duration-300 ${justSaved ? '!bg-green-50 !text-green-700 !border-green-300' : ''}`}
      icon={buttonIcon}
      onClick={handleToggleSave}
      disabled={isLoading || justSaved} // Desactivado mientras carga o muestra el mensaje de éxito
    >
      {buttonText}
    </ActionButton>
  );
};
