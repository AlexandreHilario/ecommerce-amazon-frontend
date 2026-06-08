"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCarrinho } from "@/hooks/useCarrinho";

export default function CarrinhoPage() {
  const router = useRouter();
  const { items, loading, total, adicionarProduto, removerProduto, atualizarQuantidade } = useCarrinho();

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Carrinho de Compras</h1>
          <div className="animate-pulse space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 flex gap-4">
                <div className="bg-gray-200 w-24 h-24 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="bg-gray-200 h-4 rounded w-3/4" />
                  <div className="bg-gray-200 h-4 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center py-20">
          <p className="text-5xl mb-4">🛒</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-500 mb-6">Adicione produtos para continuar comprando.</p>
          <Link href="/produtos" className="px-6 py-2 bg-[#febd69] hover:bg-[#f3a847] rounded-full font-medium text-gray-900 text-sm">
            Ver produtos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Carrinho de Compras</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 flex gap-4 items-start">
                <div className="bg-gray-100 rounded w-24 h-24 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.imagemBase64
                    ? <img src={`data:image/*;base64,${item.imagemBase64}`} alt={item.nome} className="h-full w-full object-contain" />
                    : <span className="text-3xl">📦</span>}
                </div>
                <div className="flex-1">
                  <Link href={`/produtos/${item.id}`} className="font-medium text-gray-800 hover:text-[#c7511f] text-sm">
                    {item.nome}
                  </Link>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    R$ {item.preco?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <label className="text-xs text-gray-500">Qtd:</label>
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button
                        onClick={() => atualizarQuantidade(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-sm"
                      >−</button>
                      <span className="px-3 py-1 text-sm border-x border-gray-300">{item.quantity}</span>
                      <button
                        onClick={() => atualizarQuantidade(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-sm"
                      >+</button>
                    </div>
                    <button
                      onClick={() => removerProduto(item.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    R$ {(item.preco * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Resumo do pedido</h2>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} itens)</span>
                <span>R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Frete</span>
                <span className="text-green-600 font-medium">Grátis</span>
              </div>
              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="w-full py-3 bg-[#febd69] hover:bg-[#f3a847] rounded-full font-medium text-gray-900 text-sm transition-colors"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
