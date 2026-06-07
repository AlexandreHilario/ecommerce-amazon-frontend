"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { buscarVenda } from "@/services/vendaService";

export default function PedidoDetalhe() {
  const { id } = useParams();

  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await buscarVenda(id);
      setPedido(data);
    };

    if (id) load();
  }, [id]);

  if (!pedido) return <p className="p-6">Carregando...</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      
      <div className="bg-white border rounded-lg p-4 mb-6">
        <h1 className="text-xl font-bold">
          Pedido #{pedido.vendaId}
        </h1>
        <p className="text-gray-600">
          Status: {pedido.status}
        </p>
      </div>

      
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b font-semibold">
          Itens do pedido
        </div>

        {pedido.itens?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between p-4 border-b last:border-b-0"
          >
            <div>
              <p className="font-medium">{item.nomeProduto}</p>
              <p className="text-sm text-gray-500">
                Qtd: {item.quantidade}
              </p>
            </div>

            <p className="font-semibold">
              R$ {item.subtotal}
            </p>
          </div>
        ))}

        
        <div className="p-4 flex justify-between font-bold">
          <span>Total</span>
          <span>R$ {pedido.valorTotal}</span>
        </div>
      </div>
    </main>
  );
}