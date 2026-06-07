"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { historicoPedidos } from "@/services/vendaService";

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
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = await historicoPedidos(user.id);
      setPedidos(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 w-1/3 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Meus pedidos</h1>

      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.vendaId}
            className="border rounded-lg bg-white shadow-sm hover:shadow-md transition"
          >
            {/* HEADER DO CARD */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b bg-gray-50">
              <div>
                <p className="text-sm text-gray-500">PEDIDO</p>
                <p className="font-bold">#{pedido.vendaId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">TOTAL</p>
                <p className="font-bold text-green-700">
                  R$ {pedido.valorTotal}
                </p>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    pedido.status
                  )}`}
                >
                  {pedido.status}
                </span>
              </div>

              <div className="text-sm text-gray-500">
                {new Date(pedido.criadoEm).toLocaleDateString("pt-BR")}
              </div>
            </div>

            {/* FOOTER DO CARD */}
            <div className="flex gap-3 p-4">
              <Link
                href={`/pedidos/${pedido.vendaId}`}
                className="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
              >
                Ver detalhes
              </Link>

              <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded text-sm font-semibold">
                Comprar novamente
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}