"use client"

import useCartStore from "@/store/cartStore"

export default function CartItem({ item }) {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCartStore()

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <img
        src={item.imageUrl || "/placeholder.png"}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
        <p className="text-orange-500 font-bold mt-1">
          R$ {item.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => decreaseQuantity(item.id)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => increaseQuantity(item.id)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600"
        >
          +
        </button>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-800">
          R$ {(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 text-xs mt-1"
        >
          Remover
        </button>
      </div>
    </div>
  )
}
