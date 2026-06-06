"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/fecthWinthAuth";

const cores = ["#FF9900", "#3498db", "#9b59b6", "#27ae60", "#e74c3c"];

function iniciais(nome) {
  return nome?.slice(0, 2).toUpperCase() ?? "??";
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtrado, setFiltrado] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  useEffect(() => {
    const q = busca.toLowerCase();
    const lista = Array.isArray(usuarios) ? usuarios : [];
    setFiltrado(
      lista.filter(
        (u) =>
          u.nome?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
      )
    );
  }, [busca, usuarios]);

  async function carregarUsuarios() {
    try {
      const res = await fetchWithAuth("/Usuario/listar");
      const data = await res.json();

      console.log("Resposta da API:", data);

      let lista = [];
      if (Array.isArray(data)) lista = data;
      else if (Array.isArray(data.content)) lista = data.content;
      else if (Array.isArray(data.data)) lista = data.data;
      else if (Array.isArray(data.usuarios)) lista = data.usuarios;

      setUsuarios(lista);
      setFiltrado(lista);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setUsuarios([]);
      setFiltrado([]);
    } finally {
      setLoading(false);
    }
  }

  async function deletarUsuario(id) {
    if (!confirm("Deseja realmente excluir este usuário?")) return;
    try {
      await fetchWithAuth(`/Usuario/usuario/${id}`, { method: "DELETE" });
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  }

  async function salvarEdicao() {
    if (!editando) return;
    setSalvando(true);
    try {
      await fetchWithAuth(`/Usuario/atualizarUsuario/${editando.id}`, {
        method: "PUT",
        body: JSON.stringify(editando),
      });
      setUsuarios((prev) =>
        prev.map((u) => (u.id === editando.id ? editando : u))
      );
      setEditando(null);
    } catch (err) {
      console.error("Erro ao salvar:", err);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Usuários</h2>
        <p style={{ fontSize: 13, color: "#777", marginTop: 2 }}>
          {Array.isArray(usuarios) ? usuarios.length : 0} usuários cadastrados
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
                <th>Perfil</th>
                <th>Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filtrado) &&
                filtrado.map((u, i) => (
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
                        {iniciais(u.nome)}
                      </span>
                      {u.nome}
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`status ${
                          u.tipoUsuario === "ADMIN"
                            ? "status-ativo"
                            : "status-inativo"
                        }`}
                      >
                        {u.tipoUsuario ?? "—"}
                      </span>
                    </td>
                    <td>
                      {u.criadoEm
                        ? new Date(u.criadoEm).toLocaleDateString("pt-BR")
                        : "—"}
                    </td>
                    <td>
                      <button
                        className="btn-sm"
                        onClick={() => setEditando({ ...u })}
                      >
                        <i className="ti ti-edit" /> Editar
                      </button>
                      <button
                        className="btn-sm btn-danger"
                        onClick={() => deletarUsuario(u.id)}
                      >
                        <i className="ti ti-trash" /> Excluir
                      </button>
                    </td>
                  </tr>
                ))}

              {(!Array.isArray(filtrado) || filtrado.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "center", color: "#999", padding: 24 }}
                  >
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editando && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: 28,
              width: 420,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
              Editar usuário
            </h3>

            <label style={{ fontSize: 12, color: "#777", display: "block", marginBottom: 4 }}>
              Nome
            </label>
            <input
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6, marginBottom: 14 }}
              value={editando.nome || ""}
              onChange={(e) => setEditando({ ...editando, nome: e.target.value })}
            />

            <label style={{ fontSize: 12, color: "#777", display: "block", marginBottom: 4 }}>
              E-mail
            </label>
            <input
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6, marginBottom: 14 }}
              value={editando.email || ""}
              onChange={(e) => setEditando({ ...editando, email: e.target.value })}
            />

            <label style={{ fontSize: 12, color: "#777", display: "block", marginBottom: 4 }}>
              Perfil
            </label>
            <select
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6, marginBottom: 20 }}
              value={editando.tipoUsuario || "USER"}
              onChange={(e) => setEditando({ ...editando, tipoUsuario: e.target.value })}
            >
              <option value="ADMIN">Admin</option>
              <option value="USER">Cliente</option>
            </select>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                className="btn"
                style={{ background: "#f0f0f0", color: "#333" }}
                onClick={() => setEditando(null)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={salvarEdicao}
                disabled={salvando}
              >
                {salvando ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}