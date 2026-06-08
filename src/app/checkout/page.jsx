"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCarrinho } from "@/hooks/useCarrinho";
import { vendaService } from "@/services/vendaService";
import { useAuthStore } from "@/store/authStore";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { items, total, limparCarrinho } = useCarrinho();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [vendaFinalizada, setVendaFinalizada] = useState(null);

  const handleFinalizar = async () => {
    if (!user?.id) {
      router.push("/login");
      return;
    }
    setErro("");
    setLoading(true);
    try {
      const venda = await vendaService.finalizar(user.id);
      await limparCarrinho();
      setVendaFinalizada(venda);
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (vendaFinalizada) {
    return (
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedido realizado!</h1>
            <p className="text-gray-600 mb-2">
              Pedido <strong>#{vendaFinalizada.vendaId}</strong> criado com sucesso.
            </p>
            <p className="text-xl font-bold text-gray-900 mb-6">
              Total: R$ {vendaFinalizada.valorTotal?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Status: <span className="font-medium text-yellow-600">{vendaFinalizada.status}</span>
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/pedidos" className="px-6 py-2 bg-[#febd69] hover:bg-[#f3a847] rounded-full font-medium text-gray-900 text-sm">
                Ver meus pedidos
              </Link>
              <Link href="/produtos" className="px-6 py-2 border border-gray-300 hover:bg-gray-50 rounded-full text-sm text-gray-700">
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center py-20">
          <p className="text-gray-500 mb-4">Seu carrinho está vazio.</p>
          <Link href="/produtos" className="text-[#c7511f] hover:underline text-sm">
            Ver produtos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Finalizar Pedido</h1>

        <div className="bg-white rounded-lg p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-4">Itens do pedido</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-700">
                <span className="flex-1">{item.nome} <span className="text-gray-400">× {item.quantity}</span></span>
                <span className="font-medium">
                  R$ {(item.preco * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm mb-4">
            ⚠ {erro}
          </div>
        )}

        <div className="flex gap-3">
          <Link
            href="/carrinho"
            className="flex-1 py-3 border border-gray-300 hover:bg-gray-50 rounded-full text-sm text-gray-700 text-center"
          >
            Voltar ao carrinho
          </Link>
          <button
            onClick={handleFinalizar}
            disabled={loading}
            className="flex-1 py-3 bg-[#febd69] hover:bg-[#f3a847] rounded-full font-medium text-gray-900 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Processando..." : "Confirmar pedido"}
          </button>
        </div>
      </div>
    </main>
  );
}
