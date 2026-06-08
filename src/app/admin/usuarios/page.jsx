"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/adminService";

const cores = ["#FF9900", "#3498db", "#9b59b6", "#27ae60", "#e74c3c"];

function iniciais(nome) {
  return nome?.slice(0, 2).toUpperCase() ?? "??";
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtrado, setFiltrado] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.usuarios
      .listar()
      .then((data) => {
        const lista = Array.isArray(data) ? data : [];
        setUsuarios(lista);
        setFiltrado(lista);
      })
      .catch(() => { setUsuarios([]); setFiltrado([]); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = busca.toLowerCase();
    setFiltrado(
      usuarios.filter(
        (u) =>
          u.nomeUsuario?.toLowerCase().includes(q) ||
          u.emailUsuario?.toLowerCase().includes(q)
      )
    );
  }, [busca, usuarios]);

  async function deletarUsuario(id) {
    if (!confirm("Deseja realmente excluir este usuário?")) return;
    try {
      await adminService.usuarios.deletar(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.response?.data?.erro ?? "Erro ao excluir usuário.");
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Usuários</h2>
        <p style={{ fontSize: 13, color: "#777", marginTop: 2 }}>
          {usuarios.length} usuário{usuarios.length !== 1 ? "s" : ""} cadastrado{usuarios.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
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
                <th>Usuário</th>
                <th>E-mail</th>
                <th>Idade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrado.map((u, i) => (
                <tr key={u.id}>
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: cores[i % cores.length],
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        marginRight: 8,
                        verticalAlign: "middle",
                      }}
                    >
                      {iniciais(u.nomeUsuario)}
                    </span>
                    {u.nomeUsuario}
                  </td>
                  <td>{u.emailUsuario}</td>
                  <td>{u.idadeUsuario ?? "—"}</td>
                  <td>
                    <button
                      className="btn-sm btn-danger"
                      onClick={() => deletarUsuario(u.id)}
                    >
                      <i className="ti ti-trash" /> Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {filtrado.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "#999", padding: 24 }}>
                    Nenhum usuário encontrado.
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
