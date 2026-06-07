"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/fecthWinthAuth";

export default function ProdutosAdminPage() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    ativo: true,
    imagem: null,
  });
  const [editandoId, setEditandoId] = useState(null);

  async function carregarProdutos() {
    const response = await fetchWithAuth("/produtos");
    const data = await response.json();
    setProdutos(data);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  function converterImagemBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function salvarProduto(e) {
    e.preventDefault();

    const imagemBase64 = await converterImagemBase64(form.imagem);

    const produto = {
      nome: form.nome,
      descricao: form.descricao,
      preco: Number(form.preco),
      estoque: Number(form.estoque),
      ativo: form.ativo,
      imagem: imagemBase64,
    };

    await fetchWithAuth(editandoId ? `/produtos/${editandoId}` : "/produtos", {
      method: editandoId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    setForm({
      nome: "",
      descricao: "",
      preco: "",
      estoque: "",
      ativo: true,
      imagem: null,
    });

    setEditandoId(null);
    carregarProdutos();
  }

  function editarProduto(produto) {
    setEditandoId(produto.id);
    setForm({
      nome: produto.nome,
      descricao: produto.descricao || "",
      preco: produto.preco,
      estoque: produto.estoque,
      ativo: produto.ativo,
      imagem: null,
    });
  }

  async function deletarProduto(id) {
    if (!confirm("Deseja excluir este produto?")) return;

    await fetchWithAuth(`/produtos/${id}`, {
      method: "DELETE",
    });

    carregarProdutos();
  }

  return (
    <div className="admin-content">
      <div className="table-header">
        <span>Produtos</span>
        <button className="btn btn-primary" type="submit" form="form-produto">
          {editandoId ? "Salvar alterações" : "Criar produto"}
        </button>
      </div>

      <form id="form-produto" className="search-bar" onSubmit={salvarProduto}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
        />

        <input
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        />

        <input
          type="number"
          placeholder="Preço"
          value={form.preco}
          onChange={(e) => setForm({ ...form, preco: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Estoque"
          value={form.estoque}
          onChange={(e) => setForm({ ...form, estoque: e.target.value })}
          required
        />

        <select
          value={form.ativo}
          onChange={(e) =>
            setForm({ ...form, ativo: e.target.value === "true" })
          }
        >
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, imagem: e.target.files[0] })}
        />
      </form>

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
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>R$ {Number(produto.preco).toFixed(2)}</td>
                <td>{produto.estoque}</td>
                <td>
                  <span
                    className={`status ${
                      produto.ativo ? "status-ativo" : "status-inativo"
                    }`}
                  >
                    {produto.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-sm"
                    onClick={() => editarProduto(produto)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-sm btn-danger"
                    onClick={() => deletarProduto(produto.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}