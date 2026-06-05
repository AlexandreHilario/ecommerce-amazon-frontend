import api from "./api"

export const carrinhoService = {
  getCarrinho: async (usuarioId) => {
    const response = await api.get(`/carrinho/${usuarioId}`)
    return response.data
  },

  adicionarItem: async (usuarioId, produtoId, quantidade) => {
    const response = await api.post(`/carrinho/${usuarioId}/produto/${produtoId}`, {
      quantidade,
    })
    return response.data
  },

  removerItem: async (usuarioId, produtoId) => {
    const response = await api.delete(`/carrinho/${usuarioId}/produto/${produtoId}`)
    return response.data
  },

  atualizarQuantidade: async (usuarioId, produtoId, quantidade) => {
    const response = await api.put(`/carrinho/${usuarioId}/produto/${produtoId}`, {
      quantidade,
    })
    return response.data
  },

  limparCarrinho: async (usuarioId) => {
    const response = await api.delete(`/carrinho/${usuarioId}/limpar`)
    return response.data
  },
}
