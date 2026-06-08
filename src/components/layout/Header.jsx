"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useBuscarProdutos } from "@/hooks/useProdutos";

export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const totalItens = useCartStore((s) => s.getTotalItems());
  const [busca, setBusca] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);
  const debouncedBusca = useDebounce(busca, 350);
  const { resultados } = useBuscarProdutos(debouncedBusca);

  useEffect(() => {
    function handleClickFora(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const handleBusca = (e) => {
    e.preventDefault();
    if (busca.trim()) {
      router.push(`/produtos?busca=${encodeURIComponent(busca.trim())}`);
      setBusca("");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="w-full">
      {/* Barra Principal */}
      <div className="bg-[#131921] text-white flex items-center justify-between px-4 py-2 gap-4">

        {/* Logo */}
        <Link href="/" className="px-2 py-1 border border-transparent hover:border-white rounded flex-shrink-0">
          <h1 className="text-3xl font-bold tracking-tight">
            amazon<span className="text-[#febd69]">.</span>
          </h1>
        </Link>

        {/* Barra de Pesquisa */}
        <form onSubmit={handleBusca} className="hidden md:flex flex-1 items-center h-10 rounded overflow-hidden relative">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="h-full flex-1 px-3 text-black bg-white outline-none text-sm"
          />
          <button type="submit" className="h-full bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center text-black">
            🔍
          </button>

          {debouncedBusca.trim() && resultados.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 rounded-b max-h-64 overflow-y-auto">
              {resultados.slice(0, 8).map((p) => (
                <Link
                  key={p.id}
                  href={`/produtos/${p.id}`}
                  onClick={() => setBusca("")}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 text-gray-800 text-sm border-b last:border-0"
                >
                  <span>{p.nome}</span>
                  <span className="text-gray-500 font-medium">
                    R$ {p.preco?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </form>

        {/* Área do Usuário */}
        <div className="flex items-center gap-2 md:gap-4">
          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuAberto((v) => !v)}
                className="px-2 py-1 border border-transparent hover:border-white rounded flex flex-col text-left"
              >
                <span className="text-xs text-gray-300">Olá, {user?.nomeUsuario ?? user?.email}</span>
                <span className="text-sm font-bold">Conta e Listas</span>
              </button>
              {menuAberto && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                  <Link href="/perfil" onClick={() => setMenuAberto(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">Meu Perfil</Link>
                  <Link href="/pedidos" onClick={() => setMenuAberto(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">Meus Pedidos</Link>
                  {user?.role === "ADMIN" && (
                    <Link href="/admin" onClick={() => setMenuAberto(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">Painel Admin</Link>
                  )}
                  <hr className="my-1" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500">
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="px-2 py-1 border border-transparent hover:border-white rounded flex flex-col">
              <span className="text-xs text-gray-300">Olá, faça seu login</span>
              <span className="text-sm font-bold">Contas e Listas</span>
            </Link>
          )}

          <Link href="/carrinho" className="px-2 py-1 border border-transparent hover:border-white rounded flex items-center gap-2 relative">
            <span className="text-3xl">🛒</span>
            {totalItens > 0 && (
              <span className="absolute -top-1 left-5 bg-[#febd69] text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItens > 99 ? "99+" : totalItens}
              </span>
            )}
            <div className="hidden md:flex flex-col">
              <span className="text-xs text-gray-300">Seus itens</span>
              <span className="text-sm font-bold">Carrinho</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Barra Secundária */}
      <div className="bg-[#232f3e] text-white text-sm flex items-center px-4 py-2 gap-4 overflow-x-auto whitespace-nowrap">
        <Link href="/produtos" className="border border-transparent hover:border-white px-1 py-0.5 rounded">
          Produtos
        </Link>
        <Link href="/pedidos" className="border border-transparent hover:border-white px-1 py-0.5 rounded">
          Meus Pedidos
        </Link>
      </div>
    </header>
  );
}
