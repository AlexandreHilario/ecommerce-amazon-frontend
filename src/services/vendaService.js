import api from "@/lib/axios";

export const vendaService = {
  async finalizar(usuarioId) {
    const response = await api.post(`/vendas/finalizar/${usuarioId}`);
    return response.data;
  },

  async buscarPorId(id) {
    const response = await api.get(`/vendas/${id}`);
    return response.data;
  },

  async historico(usuarioId) {
    const response = await api.get(`/vendas/historico/${usuarioId}`);
    return response.data;
  },

  async listar() {
    const response = await api.get("/vendas/listar");
    return response.data;
  },

  async atualizarStatus(id, status) {
    const response = await api.patch(`/vendas/${id}/status`, null, {
      params: { status },
    });
    return response.data;
  },
};
