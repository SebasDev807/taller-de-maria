import { create } from "zustand";
import type { SessionUser } from "@/actions/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuthState {
  /** Usuario autenticado o null si no hay sesión activa */
  user: SessionUser | null;
  /** Guarda el usuario en el store tras un login exitoso */
  setUser: (user: SessionUser) => void;
  /** Limpia el store al hacer logout */
  clearUser: () => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),
}));
