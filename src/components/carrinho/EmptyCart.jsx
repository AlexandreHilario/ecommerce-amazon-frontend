"use client"

import Link from "next/link"

export default function EmptyCart() {
  return (
    <div className="text-center py-20">
      <p className="text-6xl mb-4">🛒</p>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Seu carrinho está vazio
      </h2>
      <p className="text-gray-500 mb-6">
        Adicione produtos para continuar comprando
      </p>
      <Link
        href="/produtos"
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg transition-colors"
      >
        Ver Produtos
      </Link>
    </div>
  )
}
