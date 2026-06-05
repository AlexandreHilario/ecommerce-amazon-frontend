"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

const schema = z.object({
  email: z.string().min(1, "Informe seu e-mail").email("E-mail inválido"),
  senha: z.string().min(1, "Informe sua senha"),
});

export default function LoginForm() {
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
      const response = await authService.login(data.email, data.senha);
      setAuth(response.token, {
        email: response.email,
        role: response.role,
      });
      router.push("/");
    } catch (err) {
      const msg = err.response?.data?.message;
      setServerError(msg || "E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="amazon-card">
      <h1 className="amazon-heading">Fazer login</h1>

      {serverError && (
        <div className="amazon-error-box">
          <span className="amazon-error-icon">⚠</span> {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            autoComplete="current-password"
            className={`amazon-input ${errors.senha ? "amazon-input-error" : ""}`}
            {...register("senha")}
          />
          {errors.senha && (
            <p className="amazon-field-error">{errors.senha.message}</p>
          )}
        </div>

        <button type="submit" className="amazon-btn-primary" disabled={loading}>
          {loading ? "Aguarde..." : "Fazer login"}
        </button>
      </form>

      <p className="amazon-terms">
        Ao continuar, você concorda com as{" "}
        <Link href="#" className="amazon-link">
          Condições de Uso
        </Link>{" "}
        da Amazon.
      </p>

      <Link href="/esqueci-senha" className="amazon-link-block">
        Esqueceu a senha?
      </Link>

      <div className="amazon-divider">
        <span>Novo na Amazon?</span>
      </div>

      <Link href="/cadastro" className="amazon-btn-secondary">
        Criar sua conta Amazon
      </Link>
    </div>
  );
}
