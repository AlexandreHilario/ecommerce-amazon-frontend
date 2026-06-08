"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

const emailSchema = z.object({
  email: z.string().min(1, "Informe seu e-mail").email("E-mail inválido"),
});

const resetSchema = z.object({
  token: z.string().min(1, "Informe o token recebido por e-mail"),
  novaSenha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: z.string().min(1, "Confirme sua senha"),
}).refine((d) => d.novaSenha === d.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

export default function ForgotPasswordForm() {
  const [step, setStep] = useState("email"); // "email" | "reset" | "done"
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const emailForm = useForm({ resolver: zodResolver(emailSchema) });
  const resetForm = useForm({ resolver: zodResolver(resetSchema) });

  const onSubmitEmail = async (data) => {
    setServerError("");
    setLoading(true);
    try {
      await authService.esqueciSenha(data.email);
      setStep("reset");
    } catch (err) {
      setServerError(err.response?.data?.erro || "Erro ao enviar e-mail. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitReset = async (data) => {
    setServerError("");
    setLoading(true);
    try {
      await authService.redefinirSenha(data.token, data.novaSenha);
      setStep("done");
    } catch (err) {
      setServerError(err.response?.data?.erro || "Token inválido ou expirado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "done") {
    return (
      <div className="amazon-card">
        <h1 className="amazon-heading">Senha redefinida!</h1>
        <p style={{ fontSize: "14px", color: "#333", marginBottom: "16px" }}>
          Sua senha foi alterada com sucesso. Faça login com a nova senha.
        </p>
        <Link href="/login" className="amazon-btn-primary" style={{ textAlign: "center" }}>
          Ir para login
        </Link>
      </div>
    );
  }

  if (step === "reset") {
    return (
      <div className="amazon-card">
        <h1 className="amazon-heading">Redefinir senha</h1>
        <p style={{ fontSize: "14px", color: "#333", marginBottom: "16px" }}>
          Insira o token recebido no seu e-mail e escolha uma nova senha.
        </p>

        {serverError && (
          <div className="amazon-error-box">
            <span className="amazon-error-icon">⚠</span> {serverError}
          </div>
        )}

        <form onSubmit={resetForm.handleSubmit(onSubmitReset)} noValidate>
          <div className="amazon-field">
            <label htmlFor="token" className="amazon-label">Token</label>
            <input
              id="token"
              type="text"
              autoComplete="off"
              className={`amazon-input ${resetForm.formState.errors.token ? "amazon-input-error" : ""}`}
              {...resetForm.register("token")}
            />
            {resetForm.formState.errors.token && (
              <p className="amazon-field-error">{resetForm.formState.errors.token.message}</p>
            )}
          </div>

          <div className="amazon-field">
            <label htmlFor="novaSenha" className="amazon-label">Nova senha</label>
            <input
              id="novaSenha"
              type="password"
              autoComplete="new-password"
              className={`amazon-input ${resetForm.formState.errors.novaSenha ? "amazon-input-error" : ""}`}
              {...resetForm.register("novaSenha")}
            />
            {resetForm.formState.errors.novaSenha && (
              <p className="amazon-field-error">{resetForm.formState.errors.novaSenha.message}</p>
            )}
          </div>

          <div className="amazon-field">
            <label htmlFor="confirmarSenha" className="amazon-label">Confirmar senha</label>
            <input
              id="confirmarSenha"
              type="password"
              autoComplete="new-password"
              className={`amazon-input ${resetForm.formState.errors.confirmarSenha ? "amazon-input-error" : ""}`}
              {...resetForm.register("confirmarSenha")}
            />
            {resetForm.formState.errors.confirmarSenha && (
              <p className="amazon-field-error">{resetForm.formState.errors.confirmarSenha.message}</p>
            )}
          </div>

          <button type="submit" className="amazon-btn-primary" disabled={loading}>
            {loading ? "Redefinindo..." : "Redefinir senha"}
          </button>
        </form>

        <div className="amazon-divider" />

        <button
          type="button"
          className="amazon-btn-secondary"
          onClick={() => { setStep("email"); setServerError(""); }}
        >
          Voltar
        </button>
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

      <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} noValidate>
        <div className="amazon-field">
          <label htmlFor="email" className="amazon-label">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`amazon-input ${emailForm.formState.errors.email ? "amazon-input-error" : ""}`}
            {...emailForm.register("email")}
          />
          {emailForm.formState.errors.email && (
            <p className="amazon-field-error">{emailForm.formState.errors.email.message}</p>
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
