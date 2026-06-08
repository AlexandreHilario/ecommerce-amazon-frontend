"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/adminService";

const STATUS_OPTIONS = ["PENDENTE", "CONFIRMADO", "ENVIADO", "ENTREGUE", "CANCELADO"];

const STATUS_STYLE = {
  PENDENTE: "status-pendente",
  CONFIRMADO: "status-ativo",
  ENVIADO: "status-enviado",
  ENTREGUE: "status-entregue",
  CANCELADO: "status-inativo",
};

export default function AdminVendasPage() {
  const [vendas, setVendas] = useState([]);
  const [filtrado, setFiltrado] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandido, setExpandido] = useState(null);
  const [atualizando, setAtualizando] = useState(null);

  useEffect(() => {
    adminService.vendas
      .listar()
      .then((data) => {
        const lista = Array.isArray(data) ? data : [];
        setVendas(lista);
        setFiltrado(lista);
      })
      .catch(() => { setVendas([]); setFiltrado([]); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = busca.toLowerCase();
    setFiltrado(
      vendas.filter(
        (v) =>
          String(v.vendaId).includes(q) ||
          v.nomeUsuario?.toLowerCase().includes(q) ||
          v.status?.toLowerCase().includes(q)
      )
    );
  }, [busca, vendas]);

  async function atualizarStatus(id, status) {
    setAtualizando(id);
    try {
      const atualizada = await adminService.vendas.atualizarStatus(id, status);
      setVendas((prev) => prev.map((v) => (v.vendaId === id ? atualizada : v)));
    } catch (err) {
      alert(err.response?.data?.erro ?? "Erro ao atualizar status.");
    } finally {
      setAtualizando(null);
    }
  }

  const receitaTotal = vendas.reduce((acc, v) => acc + (v.valorTotal ?? 0), 0);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Vendas</h2>
        <p style={{ fontSize: 13, color: "#777", marginTop: 2 }}>
          {vendas.length} pedido{vendas.length !== 1 ? "s" : ""} · Receita total: R$ {receitaTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por ID, cliente ou status..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {loading ? (
        <p style={{ fontSize: 14, color: "#666" }}>Carregando...</p>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrado.map((v) => (
                <>
                  <tr
                    key={v.vendaId}
                    style={{ cursor: "pointer" }}
                    onClick={() => setExpandido(expandido === v.vendaId ? null : v.vendaId)}
                  >
                    <td><strong>#{v.vendaId}</strong></td>
                    <td>{v.nomeUsuario}</td>
                    <td>R$ {v.valorTotal?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td>{v.criadoEm ? new Date(v.criadoEm).toLocaleDateString("pt-BR") : "—"}</td>
                    <td>
                      <span className={`status ${STATUS_STYLE[v.status] ?? ""}`}>
                        {v.status}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select
                        value={v.status}
                        disabled={atualizando === v.vendaId}
                        onChange={(e) => atualizarStatus(v.vendaId, e.target.value)}
                        style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid #ddd", fontSize: 12, cursor: "pointer" }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  {expandido === v.vendaId && (
                    <tr key={`${v.vendaId}-detail`}>
                      <td colSpan={6} style={{ background: "#f9f9f9", padding: "12px 20px" }}>
                        <table style={{ width: "100%", fontSize: 13 }}>
                          <thead>
                            <tr style={{ color: "#999", textAlign: "left" }}>
                              <th style={{ paddingBottom: 6 }}>Produto</th>
                              <th style={{ paddingBottom: 6, textAlign: "center" }}>Qtd</th>
                              <th style={{ paddingBottom: 6, textAlign: "center" }}>Unit.</th>
                              <th style={{ paddingBottom: 6, textAlign: "right" }}>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {v.itens?.map((item) => (
                              <tr key={item.produtoId}>
                                <td style={{ padding: "4px 0" }}>{item.nomeProduto}</td>
                                <td style={{ textAlign: "center" }}>{item.quantidade}</td>
                                <td style={{ textAlign: "center" }}>R$ {item.precoUnitario?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                                <td style={{ textAlign: "right", fontWeight: 600 }}>R$ {item.subtotal?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
              ))}

              {filtrado.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#999", padding: 24 }}>
                    Nenhuma venda encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
