import api from "@/lib/axios";

export const usuarioService = {
  async listar() {
    const response = await api.get("/usuarios");
    return response.data;
  },

  async buscarPorEmail(email) {
    const lista = await this.listar();
    return Array.isArray(lista) ? lista.find((u) => u.emailUsuario === email) ?? null : null;
  },

  async buscarPorId(id) {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  async atualizar(id, dados) {
    const response = await api.put(`/usuarios/${id}`, dados);
    return response.data;
  },

  async deletar(id) {
    await api.delete(`/usuarios/${id}`);
  },
};
