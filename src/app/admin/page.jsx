"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/components/admin/MetricCard";
import { fetchWithAuth } from "@/lib/fecthWinthAuth";

export default function AdminOverviewPage() {
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [usuarios, produtos, vendas] = await Promise.all([
          fetchWithAuth("/Usuario/listar").then((r) => r.json()),
          fetchWithAuth("/produtos").then((r) => r.json()),
          fetchWithAuth("/vendas/listar").then((r) => r.json()),
        ]);

        const hoje = new Date().toISOString().slice(0, 10);
        const receitaHoje = Array.isArray(vendas)
          ? vendas
              .filter((v) => v.dataVenda?.startsWith(hoje))
              .reduce((acc, v) => acc + (v.valorTotal ?? 0), 0)
          : 0;

        setResumo({
          totalUsuarios: Array.isArray(usuarios) ? usuarios.length : 0,
          totalProdutos: Array.isArray(produtos) ? produtos.length : 0,
          totalVendas: Array.isArray(vendas) ? vendas.length : 0,
          receitaHoje,
        });
      } catch (err) {
        console.error("Erro ao carregar resumo:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p style={{ color: "#666", fontSize: 14 }}>Carregando...</p>;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Visão geral</h2>
        <p style={{ fontSize: 13, color: "#777", marginTop: 2 }}>
          Resumo da plataforma em tempo real
        </p>
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="Receita hoje"
          value={`R$ ${resumo?.receitaHoje.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          sub="Vendas do dia"
          trend="up"
        />
        <MetricCard
          label="Total de usuários"
          value={String(resumo?.totalUsuarios)}
          sub="Cadastrados na plataforma"
        />
        <MetricCard
          label="Produtos ativos"
          value={String(resumo?.totalProdutos)}
          sub="No catálogo"
        />
        <MetricCard
          label="Total de vendas"
          value={String(resumo?.totalVendas)}
          sub="Todos os pedidos"
        />
      </div>
    </div>
  );
}