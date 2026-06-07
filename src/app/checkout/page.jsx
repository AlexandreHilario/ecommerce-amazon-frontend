"use client";

import { useState } from "react";
import useCartStore from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { finalizarCompra } from "@/services/vendaService";

export default function CheckoutPage() {
  const router = useRouter();

  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = getTotal();
  const shipping = subtotal > 299 ? 0 : 19.9;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setError("");

    if (!user?.id) {
      setError("Usuário não identificado. Faça login novamente.");
      return;
    }

    if (items.length === 0) {
      setError("Carrinho vazio.");
      return;
    }

    try {
      setLoading(true);

      const venda = await finalizarCompra(user.id);

      clearCart();

      router.push(`/pedidos/${venda.vendaId || venda.id}`);
    } catch (err) {
      setError(err.message || "Erro ao finalizar compra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ITENS */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Itens do pedido</h2>

          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>
                R$ {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* RESUMO */}
        <div className="bg-white p-4 rounded-lg shadow h-fit">
          <h2 className="font-semibold mb-4">Resumo</h2>

          <div className="text-sm space-y-2">
            <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
            <p>Frete: {shipping === 0 ? "Grátis" : `R$ ${shipping}`}</p>

            <hr />

            <p className="font-bold">
              Total: R$ {total.toFixed(2)}
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Finalizando..." : "Finalizar compra"}
          </button>
        </div>
      </div>
    </main>
  );
}