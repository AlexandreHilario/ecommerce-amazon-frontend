"use client";

import { useQuery } from "@tanstack/react-query";
import { produtoService } from "@/services/produtoService";

export function useProdutos() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["produtos", "ativos"],
    queryFn: () => produtoService.listarAtivos(),
  });

  return {
    produtos: data ?? [],
    loading: isLoading,
    error: isError ? "Erro ao carregar produtos." : null,
    recarregar: refetch,
  };
}

export function useProduto(id) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["produto", id],
    queryFn: () => produtoService.buscarPorId(id),
    enabled: !!id,
  });

  return {
    produto: data ?? null,
    loading: isLoading,
    error: isError ? "Produto não encontrado." : null,
  };
}

export function useBuscarProdutos(nome) {
  const { data, isLoading } = useQuery({
    queryKey: ["produtos", "busca", nome],
    queryFn: () => produtoService.buscarPorNome(nome),
    enabled: !!nome?.trim(),
  });

  return {
    resultados: data ?? [],
    loading: isLoading,
  };
}
