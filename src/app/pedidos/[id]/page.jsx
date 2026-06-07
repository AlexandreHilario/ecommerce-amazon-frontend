"use client";

import { useEffect, useState } from "react";
import { buscarPedido } from "@/services/vendaService";

function StatusBadge({ status }) {
  const color =
    status === "ENTREGUE"
      ? "bg-green-100 text-green-700"
      : status === "ENVIADO"
      ? "bg-blue-100 text-blue-700"
      : status === "CANCELADO"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}

export default function PedidoDetalhe({ params }) {
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await buscarPedido(params.id);
      setPedido(data);
    }

    load();
  }, [params.id]);

  if (!pedido) {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-pulse">
        <div className="h-6 bg-gray-200 w-1/3 mb-4"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Pedido #{pedido.vendaId}
          </h1>
          <p className="text-gray-500 text-sm">
            Realizado em{" "}
            {new Date(pedido.criadoEm).toLocaleDateString("pt-BR")}
          </p>
        </div>

        <StatusBadge status={pedido.status} />
      </div>

      {/* ITENS */}
      <div className="bg-white border rounded-lg">
        {pedido.itens?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border-b last:border-none"
          >
            <div>
              <p className="font-medium">{item.nomeProduto}</p>
              <p className="text-sm text-gray-500">
                Qtd: {item.quantidade}
              </p>
            </div>

            <div className="text-right">
              <p>R$ {item.precoUnitario}</p>
              <p className="text-sm text-gray-500">
                Subtotal: R$ {(item.precoUnitario * item.quantidade).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-4 text-right">
        <p className="text-lg font-bold">
          Total: R$ {pedido.valorTotal}
        </p>
      </div>
    </main>
  );
}