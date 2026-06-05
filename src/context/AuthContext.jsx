"use client";

import { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { token, user, isAuthenticated, setAuth, logout, hydrate } =
    useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, setAuth, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
