"use client"

import useCartStore from "@/store/cartStore"
import { useRouter } from "next/navigation"

export default function CartSummary() {
  const { items, getTotal, clearCart } = useCartStore()
  const router = useRouter()

  const total = getTotal()
  const shipping = total > 299 ? 0 : 19.9
  const finalTotal = total + shipping

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Resumo do Pedido</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} itens)</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Frete</span>
          <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
            {shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-gray-500">
            Frete grátis em compras acima de R$ 299,00
          </p>
        )}
        <hr className="border-gray-200" />
        <div className="flex justify-between font-bold text-base text-gray-800">
          <span>Total</span>
          <span>R$ {finalTotal.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={() => router.push("/checkout")}
        className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-colors"
      >
        Fechar Pedido
      </button>
      <button
        onClick={clearCart}
        className="w-full mt-2 border border-gray-300 hover:bg-gray-50 text-gray-600 font-medium py-2 rounded-lg text-sm transition-colors"
      >
        Esvaziar Carrinho
      </button>
    </div>
  )
}
