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

  async esqueciSenha(email) {
    const response = await api.post("/auth/esqueci-senha", { email });
    return response.data;
  },

  async redefinirSenha(token, novaSenha) {
    const response = await api.post("/auth/redefinir-senha", { token, novaSenha });
    return response.data;
  },
};
