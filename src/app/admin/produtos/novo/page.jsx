"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminService } from "@/services/adminService";

export default function NovoProdutoPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nome: "", descricao: "", preco: "", estoque: "", ativo: true });
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImagem = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagem(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSalvando(true);
    try {
      await adminService.produtos.criar(
        {
          nome: form.nome,
          descricao: form.descricao,
          preco: parseFloat(form.preco),
          estoque: parseInt(form.estoque, 10),
          ativo: form.ativo,
        },
        imagem
      );
      router.push("/admin/produtos");
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao criar produto.");
    } finally {
      setSalvando(false);
    }
  };

  const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, outline: "none" };
  const labelStyle = { fontSize: 12, color: "#555", display: "block", marginBottom: 4, fontWeight: 500 };

  return (
    <div>
      <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/admin/produtos" style={{ color: "#666", textDecoration: "none", fontSize: 13 }}>
          ← Voltar
        </Link>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Novo Produto</h2>
      </div>

      <div style={{ background: "#fff", borderRadius: 10, padding: 28, maxWidth: 560 }}>
        {erro && (
          <div style={{ background: "#fff0f0", border: "1px solid #ffcccc", color: "#c0392b", borderRadius: 6, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>
            ⚠ {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: "Nome", name: "nome", type: "text", required: true },
            { label: "Descrição", name: "descricao", type: "text" },
            { label: "Preço (R$)", name: "preco", type: "number", step: "0.01", required: true },
            { label: "Estoque", name: "estoque", type: "number", required: true },
          ].map(({ label, name, ...rest }) => (
            <div key={name} style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{label}</label>
              <input name={name} value={form[name]} onChange={handleChange} style={inputStyle} {...rest} />
            </div>
          ))}

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Imagem do produto</label>
            <label style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              border: "2px dashed #ddd", borderRadius: 8, padding: 20, cursor: "pointer",
              background: preview ? "#f9f9f9" : "#fafafa", gap: 8,
            }}>
              {preview ? (
                <img src={preview} alt="preview" style={{ maxHeight: 160, maxWidth: "100%", borderRadius: 6, objectFit: "contain" }} />
              ) : (
                <>
                  <span style={{ fontSize: 32 }}>📷</span>
                  <span style={{ fontSize: 13, color: "#888" }}>Clique para selecionar uma imagem</span>
                  <span style={{ fontSize: 11, color: "#bbb" }}>PNG, JPG, WEBP</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImagem} style={{ display: "none" }} />
            </label>
            {preview && (
              <button type="button" onClick={() => { setImagem(null); setPreview(null); }}
                style={{ marginTop: 6, fontSize: 12, color: "#e74c3c", background: "none", border: "none", cursor: "pointer" }}>
                Remover imagem
              </button>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <input type="checkbox" id="ativo" name="ativo" checked={form.ativo} onChange={handleChange} />
            <label htmlFor="ativo" style={{ fontSize: 14, color: "#333" }}>Produto ativo</label>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/admin/produtos"
              style={{ flex: 1, padding: "10px 0", border: "1px solid #ddd", borderRadius: 6, textAlign: "center", fontSize: 14, color: "#333", textDecoration: "none" }}>
              Cancelar
            </Link>
            <button type="submit" disabled={salvando} className="btn btn-primary" style={{ flex: 1 }}>
              {salvando ? "Salvando..." : "Criar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
