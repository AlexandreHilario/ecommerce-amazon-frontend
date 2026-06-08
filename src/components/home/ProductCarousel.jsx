"use client";

import Link from "next/link";
import { useProdutos } from "@/hooks/useProdutos";
import { useCarrinho } from "@/hooks/useCarrinho";
import { useState } from "react";

export default function ProductCarousel() {
  const { produtos, loading } = useProdutos();
  const { adicionarProduto } = useCarrinho();
  const [feedback, setFeedback] = useState({});

  const handleAdicionar = async (produto) => {
    try {
      await adicionarProduto(produto);
      setFeedback((prev) => ({ ...prev, [produto.id]: true }));
      setTimeout(() => setFeedback((prev) => ({ ...prev, [produto.id]: false })), 2000);
    } catch {
      // silencioso
    }
  };

  const destaques = produtos.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
        <Link href="/produtos" className="text-sm text-[#c7511f] hover:underline">
          Ver todos →
        </Link>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
              <div className="bg-gray-200 h-40 rounded mb-4" />
              <div className="bg-gray-200 h-4 rounded mb-2" />
              <div className="bg-gray-200 h-4 w-1/2 rounded mb-3" />
              <div className="bg-gray-200 h-8 rounded" />
            </div>
          ))}
        </div>
      ) : destaques.length === 0 ? (
        <p className="text-gray-500 text-sm">Nenhum produto disponível no momento.</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {destaques.map((produto) => (
            <div key={produto.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col">
              <Link href={`/produtos/${produto.id}`}>
                <div className="bg-gray-100 h-40 rounded mb-4 flex items-center justify-center overflow-hidden">
                  {produto.imagemBase64
                    ? <img src={`data:image/*;base64,${produto.imagemBase64}`} alt={produto.nome} className="h-full w-full object-contain" />
                    : <span className="text-5xl">📦</span>}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1 hover:text-[#c7511f]">
                  {produto.nome}
                </h3>
                <p className="font-bold text-gray-900 mb-3">
                  R$ {produto.preco?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </Link>
              <button
                onClick={() => handleAdicionar(produto)}
                disabled={produto.estoque === 0}
                className="mt-auto bg-[#febd69] hover:bg-[#f3a847] px-4 py-2 rounded text-sm font-medium text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {feedback[produto.id] ? "✓ Adicionado!" : produto.estoque === 0 ? "Sem estoque" : "Adicionar ao carrinho"}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
