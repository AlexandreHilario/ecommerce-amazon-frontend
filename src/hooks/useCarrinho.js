"use client";

import { useState } from "react";
import { carrinhoService } from "@/services/carrinhoService";
import useCartStore from "@/store/cartStore";

export function useCarrinho() {
  const { carrinhoId, items, setCarrinhoId, setItems } = useCartStore();
  const [error, setError] = useState(null);

  const adicionarProduto = async (produto, quantidade = 1) => {
    if (!carrinhoId) {
      setError("Carrinho não disponível. Tente novamente.");
      return;
    }
    try {
      await carrinhoService.adicionarProduto(carrinhoId, produto.id, quantidade);
      const item = items.find((i) => i.id === produto.id);
      if (item) {
        setItems(items.map((i) => i.id === produto.id ? { ...i, quantity: i.quantity + quantidade } : i));
      } else {
        setItems([...items, { ...produto, quantity: quantidade }]);
      }
    } catch (err) {
      setError("Erro ao adicionar produto.");
      throw err;
    }
  };

  const removerProduto = async (produtoId) => {
    if (!carrinhoId) return;
    try {
      await carrinhoService.removerProduto(carrinhoId, produtoId);
      setItems(items.filter((i) => i.id !== produtoId));
    } catch (err) {
      setError("Erro ao remover produto.");
      throw err;
    }
  };

  const atualizarQuantidade = async (produtoId, quantidade) => {
    if (!carrinhoId) return;
    if (quantidade <= 0) return removerProduto(produtoId);
    try {
      await carrinhoService.atualizarQuantidade(carrinhoId, produtoId, quantidade);
      setItems(items.map((i) => i.id === produtoId ? { ...i, quantity: quantidade } : i));
    } catch (err) {
      setError("Erro ao atualizar quantidade.");
      throw err;
    }
  };

  const limparCarrinho = async () => {
    if (!carrinhoId) return;
    try {
      await carrinhoService.limpar(carrinhoId);
      setItems([]);
    } catch (err) {
      setError("Erro ao limpar carrinho.");
      throw err;
    }
  };

  const total = items.reduce((acc, i) => acc + i.preco * i.quantity, 0);
  const totalItens = items.reduce((acc, i) => acc + i.quantity, 0);

  return {
    carrinhoId,
    items,
    error,
    total,
    totalItens,
    adicionarProduto,
    removerProduto,
    atualizarQuantidade,
    limparCarrinho,
  };
}
