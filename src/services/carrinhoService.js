import api from "@/lib/axios";

export const carrinhoService = {
  async criar(usuarioId) {
    const response = await api.post(`/carrinhos/usuario/${usuarioId}`);
    return response.data;
  },

  async buscar(usuarioId) {
    const response = await api.get(`/carrinhos/usuario/${usuarioId}`);
    return response.data;
  },

  async adicionarProduto(carrinhoId, produtoId, quantidade) {
    const response = await api.post(`/carrinhos/${carrinhoId}/produtos`, {
      produtoId,
      quantidade,
    });
    return response.data;
  },

  async atualizarQuantidade(carrinhoId, produtoId, quantidade) {
    await api.patch(`/carrinhos/${carrinhoId}/produtos/${produtoId}`, { quantidade });
  },

  async removerProduto(carrinhoId, produtoId) {
    await api.delete(`/carrinhos/${carrinhoId}/produtos/${produtoId}`);
  },

  async limpar(carrinhoId) {
    await api.delete(`/carrinhos/${carrinhoId}/limpar`);
  },
};
