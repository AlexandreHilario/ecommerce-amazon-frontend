"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { historicoVendas } from "@/services/vendaService";
import Link from "next/link";

function getStatusColor(status) {
  switch (status) {
    case "ENTREGUE":
      return "bg-green-100 text-green-700";
    case "ENVIADO":
      return "bg-blue-100 text-blue-700";
    case "CANCELADO":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

export default function PedidosPage() {
  const { user } = useAuthStore();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await historicoVendas(user.id);
        setPedidos(data);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) load();
  }, [user]);

  if (loading) return <p className="p-6">Carregando pedidos...</p>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Seus pedidos</h1>

      <div className="space-y-6">
        {pedidos.map((pedido) => (
          <div
            key={pedido.vendaId}
            className="bg-white border rounded-lg shadow-sm overflow-hidden"
          >
            
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b">
              <div>
                <p className="text-sm text-gray-500">Pedido</p>
                <p className="font-semibold">#{pedido.vendaId}</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-bold">R$ {pedido.valorTotal}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  pedido.status
                )}`}
              >
                {pedido.status}
              </span>
            </div>

           
            <div className="p-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <p>
                  Criado em{" "}
                  {new Date(pedido.criadoEm).toLocaleDateString("pt-BR")}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {pedido.itens?.length || 0} item(ns)
                </p>
              </div>

              <Link
                href={`/pedidos/${pedido.vendaId}`}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-semibold"
              >
                Ver detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}