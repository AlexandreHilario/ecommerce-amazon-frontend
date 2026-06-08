"use client";

import { useState, useEffect, useCallback } from "react";
import { produtoService } from "@/services/produtoService";

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await produtoService.listarAtivos();
      setProdutos(data);
    } catch (err) {
      setError("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { produtos, loading, error, recarregar: carregar };
}

export function useProduto(id) {
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    produtoService
      .buscarPorId(id)
      .then(setProduto)
      .catch(() => setError("Produto não encontrado."))
      .finally(() => setLoading(false));
  }, [id]);

  return { produto, loading, error };
}

export function useBuscarProdutos(nome) {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!nome?.trim()) {
      setResultados([]);
      return;
    }
    setLoading(true);
    produtoService
      .buscarPorNome(nome)
      .then(setResultados)
      .catch(() => setResultados([]))
      .finally(() => setLoading(false));
  }, [nome]);

  return { resultados, loading };
}
