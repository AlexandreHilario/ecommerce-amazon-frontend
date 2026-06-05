"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import useCartStore from "@/store/cartStore"
import CartItem from "@/components/carrinho/CartItem"
import CartSummary from "@/components/carrinho/CartSummary"
import EmptyCart from "@/components/carrinho/EmptyCart"
import Link from "next/link"

function CarrinhoPage() {
  const items = useCartStore((state) => state.items)

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Carrinho de Compras</h1>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default CarrinhoPage
