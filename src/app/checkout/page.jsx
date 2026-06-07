"use client";

import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { criarVenda } from "@/services/vendaService";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = getTotal();

  const handleFinalizar = async () => {
    setLoading(true);
    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.id) {
        throw new Error("Usuário não encontrado");
      }

      
      const venda = {
        usuarioId: user.id,
        itens: items.map((item) => ({
          produtoId: item.id,
          quantidade: item.quantity,
          precoUnitario: item.price || 0,
        })),
      };

      await criarVenda(venda);

      clearCart();

      router.push("/pedidos");
    } catch (err) {
      setError(err.message || "Erro ao finalizar compra");
    } finally {
      setLoading(false);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">Seu carrinho está vazio</h1>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ITENS */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg bg-white"
            >
              <p className="font-medium">
                {item.name || "Produto"}
              </p>

              <p>Qtd: {item.quantity}</p>

              <p>
                R$ {(item.price || 0).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

      
        <div className="border p-4 rounded-lg bg-white h-fit">
          <h2 className="font-bold mb-4">Resumo</h2>

          <p>
            Total: <b>R$ {total.toFixed(2)}</b>
          </p>

          {error && (
            <p className="text-red-500 mt-2">{error}</p>
          )}

          <button
            onClick={handleFinalizar}
            disabled={loading}
            className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 font-bold py-2 rounded"
          >
            {loading ? "Finalizando..." : "Finalizar compra"}
          </button>
        </div>

      </div>
    </main>
  );
}