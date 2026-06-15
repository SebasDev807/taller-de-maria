"use client";

import { useRouter } from "next/navigation";
import { createUser } from "@/actions/user.actions";
import { useState } from "react";
import { CreateUserInput } from "@/actions/types";

interface UseRegisterReturn {
  /**
   * Registra un nuevo usuario con los datos del formulario.
   * Retorna un mensaje de error si falla, o null en éxito.
   */
  registerUserFn: (data: CreateUserInput) => Promise<string | null>;
  showPassword: boolean;
  serverError: string | null;
  togglePassword: () => void;
  setServerError: (serverError: string | null) => void;
}

export function useRegister(): UseRegisterReturn {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const registerUserFn = async (data: CreateUserInput): Promise<string | null> => {
    const result = await createUser(data);

    if (!result.success) {
      return result.error;
    }

    // Redirige al login después del registro exitoso
    router.push("/auth/login");

    return null;
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return {
    registerUserFn,
    showPassword,
    serverError,
    togglePassword,
    setServerError,
  };
}
