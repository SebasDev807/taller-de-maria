"use client";

import { useState } from "react";
import { registerUser } from "@/actions/auth.actions";
import { CreateUserInput } from "@/actions/types";

interface UseRegisterReturn {
  /**
   * Registra un nuevo usuario. En éxito devuelve el email al que se envió
   * la confirmación. En error devuelve el mensaje de error.
   */
  registerUserFn: (data: CreateUserInput) => Promise<string | null>;
  /** Estado de espera de confirmación (email enviado). */
  emailSent: boolean;
  /** Email al que se envió el correo de confirmación. */
  sentToEmail: string | null;
  showPassword: boolean;
  serverError: string | null;
  togglePassword: () => void;
  setServerError: (serverError: string | null) => void;
}

export function useRegister(): UseRegisterReturn {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [sentToEmail, setSentToEmail] = useState<string | null>(null);

  const registerUserFn = async (data: CreateUserInput): Promise<string | null> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);

    const result = await registerUser(formData);

    if (!result.success) {
      return result.error;
    }

    // Éxito: mostrar banner de "revisa tu correo"
    setSentToEmail(result.email);
    setEmailSent(true);
    return null;
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return {
    registerUserFn,
    emailSent,
    sentToEmail,
    showPassword,
    serverError,
    togglePassword,
    setServerError,
  };
}
