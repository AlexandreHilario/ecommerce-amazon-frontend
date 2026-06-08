"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useProduto } from "@/hooks/useProdutos";
import { useCarrinho } from "@/hooks/useCarrinho";

export default function ProdutoDetalhe({ params }) {
  const { id } = use(params);
  const { produto, loading, error } = useProduto(id);
  const { adicionarProduto } = useCarrinho();
  const [quantidade, setQuantidade] = useState(1);
  const [adicionando, setAdicionando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleAdicionar = async () => {
    if (!produto) return;
    setAdicionando(true);
    try {
      await adicionarProduto(produto, quantidade);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 2500);
    } catch {
      // silencioso
    } finally {
      setAdicionando(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-lg p-8 animate-pulse flex gap-8">
            <div className="bg-gray-200 w-80 h-80 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-4">
              <div className="bg-gray-200 h-6 rounded w-3/4" />
              <div className="bg-gray-200 h-4 rounded w-full" />
              <div className="bg-gray-200 h-4 rounded w-2/3" />
              <div className="bg-gray-200 h-8 rounded w-1/3" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !produto) {
    return (
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-lg mb-4">Produto não encontrado.</p>
          <Link href="/produtos" className="text-[#c7511f] hover:underline">
            Voltar aos produtos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <Link href="/produtos" className="text-sm text-[#c7511f] hover:underline mb-4 inline-block">
          ← Voltar aos produtos
        </Link>

        <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row gap-8">
          <div className="bg-gray-100 rounded-lg w-full md:w-80 h-80 flex-shrink-0 flex items-center justify-center overflow-hidden">
            {produto.imagemBase64
              ? <img src={`data:image/*;base64,${produto.imagemBase64}`} alt={produto.nome} className="h-full w-full object-contain" />
              : <span className="text-8xl">📦</span>}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{produto.nome}</h1>
            <p className="text-gray-600 text-sm mb-4">{produto.descricao}</p>

            <p className="text-3xl font-bold text-gray-900 mb-2">
              R$ {produto.preco?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>

            {produto.estoque > 0 ? (
              <p className="text-green-600 font-medium mb-4">Em estoque — {produto.estoque} disponíveis</p>
            ) : (
              <p className="text-red-500 font-medium mb-4">Fora de estoque</p>
            )}

            {produto.estoque > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <label className="text-sm font-medium text-gray-700">Quantidade:</label>
                <select
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-[#febd69]"
                >
                  {Array.from({ length: Math.min(produto.estoque, 10) }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleAdicionar}
              disabled={adicionando || produto.estoque === 0}
              className="w-full md:w-auto px-8 py-3 rounded-full text-sm font-medium bg-[#febd69] hover:bg-[#f3a847] text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mb-2"
            >
              {sucesso ? "✓ Adicionado ao carrinho!" : adicionando ? "Adicionando..." : "Adicionar ao carrinho"}
            </button>

            {sucesso && (
              <div className="mt-2">
                <Link href="/carrinho" className="text-sm text-[#c7511f] hover:underline">
                  Ver carrinho →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
