"use client";

import { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { usuarioService } from "@/services/usuarioService";
import { carrinhoService } from "@/services/carrinhoService";
import useCartStore from "@/store/cartStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { token, user, isAuthenticated, setAuth, logout, hydrate } =
    useAuthStore();
  const { carrinhoId, setCarrinhoId } = useCartStore();

  useEffect(() => {
    hydrate();
  }, []);

  // Corrige sessões antigas sem id
  useEffect(() => {
    if (isAuthenticated && token && user && !user.id) {
      usuarioService.buscarPorEmail(user.email).then((usuario) => {
        if (usuario) {
          setAuth(token, {
            id: usuario.id,
            email: usuario.emailUsuario,
            nomeUsuario: usuario.nomeUsuario,
            role: user.role,
          });
        }
      }).catch(() => {});
    }
  }, [isAuthenticated, token, user?.id]);

  // Carrega ou cria o carrinho ao autenticar
  useEffect(() => {
    if (!isAuthenticated || !user?.id || carrinhoId) return;

    async function inicializarCarrinho() {
      try {
        const data = await carrinhoService.buscar(user.id);
        setCarrinhoId(data.id);
      } catch (errBuscar) {
        try {
          const novo = await carrinhoService.criar(user.id);
          setCarrinhoId(novo.id);
        } catch (errCriar) {
          // 400 = carrinho já existe mas buscar falhou por outro motivo, tenta buscar de novo
          if (errCriar.response?.status === 400) {
            try {
              const data = await carrinhoService.buscar(user.id);
              setCarrinhoId(data.id);
            } catch {}
          }
        }
      }
    }

    inicializarCarrinho();
  }, [isAuthenticated, user?.id]);

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
