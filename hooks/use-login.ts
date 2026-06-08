"use client";

import { useRouter } from "next/navigation";
import { loginUser, logoutUser } from "@/actions/auth.actions";
import type { SessionUser } from "@/actions/auth.actions";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

interface UseLoginReturn {
  /** Usuario activo en el store (null si no hay sesión) */
  user: SessionUser | null;
  /**
   * Inicia sesión con los datos del formulario.
   * Retorna un mensaje de error si las credenciales son incorrectas, o null en éxito.
   */
  login: (formData: FormData) => Promise<string | null>;
  /** Cierra sesión y redirige al login */
  logout: () => Promise<void>;
  showPassword: boolean;
  serverError: string | null;
  togglePassword: () => void;
  setServerError: (serverError: string | null) => void;
}

export function useLogin(): UseLoginReturn {

  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
  const togglePassword = () => setShowPassword((prev) => !prev);

  const logout = async (): Promise<void> => {
    clearUser();
    await logoutUser(); // Elimina la cookie y hace redirect en el servidor
  };

  return {
    user,
    login,
    logout,
    showPassword,
    serverError,
    togglePassword,
    setServerError
  };
}
