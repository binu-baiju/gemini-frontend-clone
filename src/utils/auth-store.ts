// src/utils/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isLoggedIn: boolean;
  phone: string | null;
  login: (phone: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      phone: null,
      login: (phone) => set({ isLoggedIn: true, phone }),
      logout: () => set({ isLoggedIn: false, phone: null }),
    }),
    { name: "auth-storage" }
  )
);
