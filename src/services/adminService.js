import api from "@/lib/axios";

export const adminService = {
  usuarios: {
    async listar() {
      const response = await api.get("/admin/usuarios");
      return response.data;
    },

    async buscarPorId(id) {
      const response = await api.get(`/admin/usuarios/${id}`);
      return response.data;
    },

    async deletar(id) {
      await api.delete(`/admin/usuarios/${id}`);
    },
  },

  produtos: {
    async listar() {
      const response = await api.get("/admin/produtos");
      return response.data;
    },

    async criar(dados, imagem) {
      const fd = new FormData();
      fd.append("dados", new Blob([JSON.stringify(dados)], { type: "application/json" }));
      if (imagem) fd.append("imagem", imagem);
      const response = await api.post("/admin/produtos", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },

    async atualizar(id, dados, imagem) {
      const fd = new FormData();
      fd.append("dados", new Blob([JSON.stringify(dados)], { type: "application/json" }));
      if (imagem) fd.append("imagem", imagem);
      const response = await api.put(`/admin/produtos/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },

    async deletar(id) {
      await api.delete(`/admin/produtos/${id}`);
    },
  },

  vendas: {
    async listar() {
      const response = await api.get("/admin/vendas");
      return response.data;
    },

    async buscarPorId(id) {
      const response = await api.get(`/admin/vendas/${id}`);
      return response.data;
    },

    async atualizarStatus(id, status) {
      const response = await api.patch(`/admin/vendas/${id}/status`, null, {
        params: { status },
      });
      return response.data;
    },
  },
};
