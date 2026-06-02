import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  // Sincronizar el input con la URL si cambia externamente
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Debounce effect para buscar por tecla
  useEffect(() => {
    const handler = setTimeout(() => {
      // Solo hacer push si el usuario realmente cambió el valor
      if (query !== initialQuery) {
        const params = new URLSearchParams(searchParams.toString());
        if (query.trim()) {
          params.set("q", query);
        } else {
          params.delete("q");
        }
        router.push(`/search?${params.toString()}`);
      }
    }, 400); // 400ms delay

    return () => clearTimeout(handler);
  }, [query, router, searchParams, initialQuery]);

  return { query, setQuery };
};
