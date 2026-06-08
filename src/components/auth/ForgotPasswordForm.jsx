"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { authService } from "@/services/authService";

const schema = z.object({
  email: z.string().min(1, "Informe seu e-mail").email("E-mail inválido"),
});

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);
    try {
      await authService.esqueciSenha(data.email);
      setSent(true);
    } catch (err) {
      setServerError(err.response?.data?.erro || "Erro ao enviar e-mail. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="amazon-card">
        <h1 className="amazon-heading">Verifique seu e-mail</h1>
        <p style={{ fontSize: "14px", color: "#333", marginBottom: "16px" }}>
          Se existir uma conta com esse e-mail, você receberá instruções para
          redefinir sua senha.
        </p>
        <Link href="/login" className="amazon-btn-primary" style={{ textAlign: "center" }}>
          Voltar para login
        </Link>
      </div>
    );
  }

  return (
    <div className="amazon-card">
      <h1 className="amazon-heading">Recuperar senha</h1>
      <p style={{ fontSize: "14px", color: "#333", marginBottom: "16px" }}>
        Informe o e-mail da sua conta para receber as instruções de recuperação.
      </p>

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

        <button type="submit" className="amazon-btn-primary" disabled={loading}>
          {loading ? "Enviando..." : "Continuar"}
        </button>
      </form>

      <div className="amazon-divider" />

      <Link href="/login" className="amazon-btn-secondary">
        Voltar para login
      </Link>
    </div>
  );
}
