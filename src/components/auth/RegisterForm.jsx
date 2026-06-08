"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { usuarioService } from "@/services/usuarioService";
import { useAuthStore } from "@/store/authStore";

const schema = z
  .object({
    nome: z
      .string()
      .min(1, "Informe seu nome")
      .max(150, "Nome muito longo"),
    email: z
      .string()
      .min(1, "Informe seu e-mail")
      .email("E-mail inválido")
      .max(150, "E-mail muito longo"),
    senha: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(255, "Senha muito longa"),
    confirmarSenha: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

export default function RegisterForm() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);
    try {
      const response = await authService.cadastrar(data.nome, data.email, data.senha);
      setAuth(response.token, { email: response.email, role: response.role });
      const usuario = await usuarioService.buscarPorEmail(response.email);
      if (usuario) {
        setAuth(response.token, {
          id: usuario.id,
          email: usuario.emailUsuario,
          nomeUsuario: usuario.nomeUsuario,
          role: response.role,
        });
      }
      router.push("/");
    } catch (err) {
      const msg = err.response?.data?.message;
      setServerError(msg || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="amazon-card">
      <h1 className="amazon-heading">Criar conta</h1>

      {serverError && (
        <div className="amazon-error-box">
          <span className="amazon-error-icon">⚠</span> {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="amazon-field">
          <label htmlFor="nome" className="amazon-label">
            Seu nome
          </label>
          <input
            id="nome"
            type="text"
            autoComplete="name"
            placeholder="Nome e sobrenome"
            className={`amazon-input ${errors.nome ? "amazon-input-error" : ""}`}
            {...register("nome")}
          />
          {errors.nome && (
            <p className="amazon-field-error">{errors.nome.message}</p>
          )}
        </div>

        <div className="amazon-field">
          <label htmlFor="email" className="amazon-label">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`amazon-input ${errors.email ? "amazon-input-error" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="amazon-field-error">{errors.email.message}</p>
          )}
        </div>

        <div className="amazon-field">
          <label htmlFor="senha" className="amazon-label">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            className={`amazon-input ${errors.senha ? "amazon-input-error" : ""}`}
            {...register("senha")}
          />
          {errors.senha && (
            <p className="amazon-field-error">{errors.senha.message}</p>
          )}
        </div>

        <div className="amazon-field">
          <label htmlFor="confirmarSenha" className="amazon-label">
            Confirme a senha
          </label>
          <input
            id="confirmarSenha"
            type="password"
            autoComplete="new-password"
            placeholder="Digite a senha novamente"
            className={`amazon-input ${errors.confirmarSenha ? "amazon-input-error" : ""}`}
            {...register("confirmarSenha")}
          />
          {errors.confirmarSenha && (
            <p className="amazon-field-error">{errors.confirmarSenha.message}</p>
          )}
        </div>

        <button type="submit" className="amazon-btn-primary" disabled={loading}>
          {loading ? "Aguarde..." : "Criar sua conta Amazon"}
        </button>
      </form>

      <p className="amazon-terms">
        Ao criar uma conta, você concorda com as{" "}
        <Link href="#" className="amazon-link">
          Condições de Uso
        </Link>{" "}
        e{" "}
        <Link href="#" className="amazon-link">
          Aviso de Privacidade
        </Link>{" "}
        da Amazon.
      </p>

      <div className="amazon-divider">
        <span>Já tem uma conta?</span>
      </div>

      <Link href="/login" className="amazon-btn-secondary">
        Fazer login
      </Link>
    </div>
  );
}
