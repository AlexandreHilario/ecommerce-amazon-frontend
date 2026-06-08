import api from "@/lib/axios";

export const produtoService = {
  async listar() {
    const response = await api.get("/produtos");
    return response.data;
  },

  async listarAtivos() {
    const response = await api.get("/produtos/ativos");
    return response.data;
  },

  async buscarPorNome(nome) {
    const response = await api.get("/produtos/buscar", { params: { nome } });
    return response.data;
  },

  async buscarPorId(id) {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  },

  async criar(dados) {
    const response = await api.post("/produtos", dados);
    return response.data;
  },

  async atualizar(id, dados) {
    const response = await api.put(`/produtos/${id}`, dados);
    return response.data;
  },

  async deletar(id) {
    await api.delete(`/produtos/${id}`);
  },
};
