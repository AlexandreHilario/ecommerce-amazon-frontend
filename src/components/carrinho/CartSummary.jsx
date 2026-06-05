"use client"

import useCartStore from "@/store/cartStore"
import { useRouter } from "next/navigation"

export default function CartSummary() {
  const { items, getTotal } = useCartStore()
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
          <span>R$ {shipping.toFixed(2)}</span>
        </div>
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
    </div>
  )
}
