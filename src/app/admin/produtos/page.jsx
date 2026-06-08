"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminService } from "@/services/adminService";

export default function AdminProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [filtrado, setFiltrado] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.produtos
      .listar()
      .then((data) => {
        const lista = Array.isArray(data) ? data : [];
        setProdutos(lista);
        setFiltrado(lista);
      })
      .catch(() => { setProdutos([]); setFiltrado([]); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = busca.toLowerCase();
    setFiltrado(produtos.filter((p) => p.nome?.toLowerCase().includes(q)));
  }, [busca, produtos]);

  async function deletarProduto(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    try {
      await adminService.produtos.deletar(id);
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.response?.data?.erro ?? "Erro ao excluir produto.");
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Produtos</h2>
          <p style={{ fontSize: 13, color: "#777", marginTop: 2 }}>
            {produtos.length} produto{produtos.length !== 1 ? "s" : ""} cadastrado{produtos.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/produtos/novo" className="btn btn-primary" style={{ textDecoration: "none" }}>
          + Novo Produto
        </Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nome..."
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
                <th>Nome</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrado.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{p.nome}</div>
                    <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{p.descricao?.slice(0, 60)}{p.descricao?.length > 60 ? "..." : ""}</div>
                  </td>
                  <td>R$ {p.preco?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                  <td>{p.estoque}</td>
                  <td>
                    <span className={`status ${p.ativo ? "status-ativo" : "status-inativo"}`}>
                      {p.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/produtos/editar/${p.id}`} className="btn-sm" style={{ textDecoration: "none", marginRight: 6 }}>
                      <i className="ti ti-edit" /> Editar
                    </Link>
                    <button className="btn-sm btn-danger" onClick={() => deletarProduto(p.id)}>
                      <i className="ti ti-trash" /> Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {filtrado.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "#999", padding: 24 }}>
                    Nenhum produto encontrado.
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
