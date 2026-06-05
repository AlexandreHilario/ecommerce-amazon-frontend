"use client";

import { create } from "zustand";

function loadFromStorage() {
  if (typeof window === "undefined") return { token: null, user: null };
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  hydrate: () => {
    const { token, user } = loadFromStorage();
    if (token) {
      document.cookie = `token=${token}; path=/; SameSite=Lax`;
      set({ token, user, isAuthenticated: true });
    }
  },

  setAuth: (token, user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      document.cookie = `token=${token}; path=/; SameSite=Lax`;
    }
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      document.cookie = "token=; path=/; max-age=0";
    }
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
