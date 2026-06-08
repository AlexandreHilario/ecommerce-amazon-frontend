"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { vendaService } from "@/services/vendaService";
import { useAuthStore } from "@/store/authStore";

const STATUS_STYLE = {
  PENDENTE: "bg-yellow-100 text-yellow-700",
  CONFIRMADO: "bg-blue-100 text-blue-700",
  ENVIADO: "bg-purple-100 text-purple-700",
  ENTREGUE: "bg-green-100 text-green-700",
  CANCELADO: "bg-red-100 text-red-700",
};

export default function PedidosPage() {
  const { user } = useAuthStore();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [expandido, setExpandido] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    vendaService
      .historico(user.id)
      .then(setPedidos)
      .catch(() => setErro("Erro ao carregar pedidos."))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Meus Pedidos</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="bg-gray-200 h-4 rounded w-1/3 mb-3" />
                <div className="bg-gray-200 h-4 rounded w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Meus Pedidos</h1>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm mb-4">
            ⚠ {erro}
          </div>
        )}

        {pedidos.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-4xl mb-4">📦</p>
            <h2 className="text-lg font-bold text-gray-700 mb-2">Nenhum pedido ainda</h2>
            <p className="text-gray-500 text-sm mb-6">Seus pedidos aparecerão aqui depois que você realizar uma compra.</p>
            <Link href="/produtos" className="px-6 py-2 bg-[#febd69] hover:bg-[#f3a847] rounded-full font-medium text-gray-900 text-sm">
              Começar a comprar
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.vendaId} className="bg-white rounded-lg overflow-hidden">
                <div
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandido(expandido === pedido.vendaId ? null : pedido.vendaId)}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-gray-800">Pedido #{pedido.vendaId}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[pedido.status] || "bg-gray-100 text-gray-600"}`}>
                        {pedido.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(pedido.criadoEm).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      R$ {pedido.valorTotal?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-400">{expandido === pedido.vendaId ? "▲ Fechar" : "▼ Ver itens"}</p>
                  </div>
                </div>

                {expandido === pedido.vendaId && (
                  <div className="border-t px-5 pb-5 pt-4 bg-gray-50">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 text-xs border-b pb-1">
                          <th className="pb-2">Produto</th>
                          <th className="pb-2 text-center">Qtd</th>
                          <th className="pb-2 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedido.itens?.map((item) => (
                          <tr key={item.produtoId} className="border-b last:border-0">
                            <td className="py-2 text-gray-700">{item.nomeProduto}</td>
                            <td className="py-2 text-center text-gray-500">{item.quantidade}</td>
                            <td className="py-2 text-right font-medium text-gray-800">
                              R$ {item.subtotal?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
