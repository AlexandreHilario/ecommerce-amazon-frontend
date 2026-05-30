import api from "@/lib/axios";

export const authService = {
  async login(email, senha) {
    const response = await api.post("/auth/login", { email, senha });
    return response.data;
  },

  async cadastrar(nome, email, senha) {
    const response = await api.post("/auth/cadastro", { nome, email, senha });
    return response.data;
  },
};
