"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchWithAuth } from "@/lib/fecthWinthAuth";

export default function VendasAdminPage() {
  const [vendas, setVendas] = useState([]);
  const [statusFiltro, setStatusFiltro] = useState("TODOS");
  const [vendaSelecionada, setVendaSelecionada] = useState(null);

  async function carregarVendas() {
    const response = await fetchWithAuth("/vendas/listar");
    const data = await response.json();
    setVendas(data);
  }

  useEffect(() => {
    carregarVendas();
  }, []);

  const vendasFiltradas = useMemo(() => {
    if (statusFiltro === "TODOS") return vendas;
    return vendas.filter((venda) => venda.status === statusFiltro);
  }, [vendas, statusFiltro]);

  const receitaTotal = vendas.reduce(
    (total, venda) => total + Number(venda.valorTotal || 0),
    0
  );

  const totalPedidos = vendas.length;
  const ticketMedio = totalPedidos > 0 ? receitaTotal / totalPedidos : 0;

  async function visualizarVenda(id) {
    const response = await fetchWithAuth(`/vendas/${id}`);
    const data = await response.json();
    setVendaSelecionada(data);
  }

  async function atualizarStatus(id, novoStatus) {
    await fetchWithAuth(`/vendas/${id}/status?status=${novoStatus}`, {
      method: "PATCH",
    });

    carregarVendas();

    if (vendaSelecionada?.id === id) {
      visualizarVenda(id);
    }
  }

  return (
    <div className="admin-content">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Receita total</div>
          <div className="metric-value">R$ {receitaTotal.toFixed(2)}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total de pedidos</div>
          <div className="metric-value">{totalPedidos}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Ticket médio</div>
          <div className="metric-value">R$ {ticketMedio.toFixed(2)}</div>
        </div>
      </div>

      <div className="search-bar">
        <select
          value={statusFiltro}
          onChange={(e) => setStatusFiltro(e.target.value)}
        >
          <option value="TODOS">Todos os status</option>
          <option value="PENDENTE">Pendente</option>
          <option value="PAGO">Pago</option>
          <option value="CANCELADO">Cancelado</option>
          <option value="ENVIADO">Enviado</option>
          <option value="ENTREGUE">Entregue</option>
        </select>
      </div>

      <div className="table-card">
        <div className="table-header">
          <span>Vendas</span>
          <span>{vendasFiltradas.length} pedidos encontrados</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Valor total</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {vendasFiltradas.map((venda) => (
              <tr key={venda.id}>
                <td>#{venda.id}</td>
                <td>R$ {Number(venda.valorTotal || 0).toFixed(2)}</td>
                <td>
                  <span
                    className={`status ${
                      venda.status === "CANCELADO"
                        ? "status-inativo"
                        : "status-ativo"
                    }`}
                  >
                    {venda.status}
                  </span>
                </td>
                <td>{venda.dataVenda || venda.criadoEm || "-"}</td>
                <td>
                  <button
                    className="btn-sm"
                    onClick={() => visualizarVenda(venda.id)}
                  >
                    Visualizar
                  </button>

                  <select
                    value={venda.status}
                    onChange={(e) =>
                      atualizarStatus(venda.id, e.target.value)
                    }
                  >
                    <option value="PENDENTE">Pendente</option>
                    <option value="PAGO">Pago</option>
                    <option value="CANCELADO">Cancelado</option>
                    <option value="ENVIADO">Enviado</option>
                    <option value="ENTREGUE">Entregue</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {vendaSelecionada && (
        <div className="table-card" style={{ marginTop: "20px" }}>
          <div className="table-header">
            <span>Detalhes do pedido #{vendaSelecionada.id}</span>
            <button
              className="btn-sm btn-danger"
              onClick={() => setVendaSelecionada(null)}
            >
              Fechar
            </button>
          </div>

          <table>
            <tbody>
              <tr>
                <th>Status</th>
                <td>{vendaSelecionada.status}</td>
              </tr>
              <tr>
                <th>Valor total</th>
                <td>
                  R$ {Number(vendaSelecionada.valorTotal || 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <th>Data</th>
                <td>{vendaSelecionada.dataVenda || vendaSelecionada.criadoEm || "-"}</td>
              </tr>
            </tbody>
          </table>

          <div className="table-header">
            <span>Itens da venda</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço unitário</th>
              </tr>
            </thead>

            <tbody>
              {vendaSelecionada.itens?.map((item, index) => (
                <tr key={index}>
                  <td>{item.produto?.nome || item.nomeProduto || "-"}</td>
                  <td>{item.quantidade}</td>
                  <td>
                    R$ {Number(item.precoUnitario || item.preco || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}