"use client";

import { useRouter } from "next/navigation";
import { loginUser, logoutUser } from "@/actions/auth.actions";
import type { SessionUser } from "@/actions/auth.actions";
import { useAuthStore } from "@/store/auth";

interface UseAuthReturn {
  /** Usuario activo en el store (null si no hay sesión) */
  user: SessionUser | null;
  /**
   * Inicia sesión con los datos del formulario.
   * Retorna un mensaje de error si las credenciales son incorrectas, o null en éxito.
   */
  login: (formData: FormData) => Promise<string | null>;
  /** Cierra sesión y redirige al login */
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  const login = async (formData: FormData): Promise<string | null> => {
    const result = await loginUser(formData);

    if (!result.success) {
      return result.error;
    }

    // Hidrata el store con los datos del usuario
    setUser(result.data);
    router.push("/admin");
    return null;
  };

  const logout = async (): Promise<void> => {
    clearUser();
    await logoutUser(); // Elimina la cookie y hace redirect en el servidor
  };

  return { user, login, logout };
}
