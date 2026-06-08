"use client";

import { useState } from "react";
import Link from "next/link";
import { useProdutos, useBuscarProdutos } from "@/hooks/useProdutos";
import { useCarrinho } from "@/hooks/useCarrinho";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProdutosPage() {
  const [busca, setBusca] = useState("");
  const [adicionando, setAdicionando] = useState(null);
  const [feedback, setFeedback] = useState({});
  const debouncedBusca = useDebounce(busca, 400);

  const { produtos, loading: loadingTodos } = useProdutos();
  const { resultados, loading: loadingBusca } = useBuscarProdutos(debouncedBusca);
  const { adicionarProduto } = useCarrinho();

  const lista = debouncedBusca.trim() ? resultados : produtos;
  const loading = debouncedBusca.trim() ? loadingBusca : loadingTodos;

  const handleAdicionar = async (produto) => {
    setAdicionando(produto.id);
    try {
      await adicionarProduto(produto);
      setFeedback((prev) => ({ ...prev, [produto.id]: true }));
      setTimeout(() => setFeedback((prev) => ({ ...prev, [produto.id]: false })), 2000);
    } catch {
      // silencioso
    } finally {
      setAdicionando(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Produtos</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-[#febd69] focus:ring-1 focus:ring-[#febd69] text-sm"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="bg-gray-200 h-40 rounded mb-3" />
                <div className="bg-gray-200 h-4 rounded mb-2" />
                <div className="bg-gray-200 h-4 w-2/3 rounded mb-3" />
                <div className="bg-gray-200 h-8 rounded" />
              </div>
            ))}
          </div>
        ) : lista.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            {debouncedBusca ? "Nenhum produto encontrado para sua busca." : "Nenhum produto disponível."}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {lista.map((produto) => (
              <div key={produto.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col">
                <Link href={`/produtos/${produto.id}`} className="flex-1">
                  <div className="bg-gray-100 rounded-md h-40 flex items-center justify-center mb-3 overflow-hidden">
                    {produto.imagemBase64
                      ? <img src={`data:image/*;base64,${produto.imagemBase64}`} alt={produto.nome} className="h-full w-full object-contain" />
                      : <span className="text-5xl">📦</span>}
                  </div>
                  <h2 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1 hover:text-[#c7511f]">
                    {produto.nome}
                  </h2>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{produto.descricao}</p>
                  <p className="text-lg font-bold text-gray-900">
                    R$ {produto.preco?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  {produto.estoque > 0 ? (
                    <p className="text-xs text-green-600 mt-1">Em estoque ({produto.estoque})</p>
                  ) : (
                    <p className="text-xs text-red-500 mt-1">Fora de estoque</p>
                  )}
                </Link>
                <button
                  onClick={() => handleAdicionar(produto)}
                  disabled={adicionando === produto.id || produto.estoque === 0}
                  className="mt-3 w-full py-2 rounded-md text-sm font-medium bg-[#febd69] hover:bg-[#f3a847] text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {feedback[produto.id]
                    ? "✓ Adicionado!"
                    : adicionando === produto.id
                    ? "Adicionando..."
                    : "Adicionar ao carrinho"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
