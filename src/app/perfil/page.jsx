"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/authStore";
import { usuarioService } from "@/services/usuarioService";

const schema = z.object({
  nomeUsuario: z.string().min(1, "Informe seu nome").max(150),
  idadeUsuario: z.coerce.number().min(1, "Idade inválida").max(120),
});

export default function PerfilPage() {
  const { user, updateUser } = useAuthStore();
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!user?.id) return;
    usuarioService
      .buscarPorId(user.id)
      .then((data) => {
        setDados(data);
        reset({ nomeUsuario: data.nomeUsuario, idadeUsuario: data.idadeUsuario });
      })
      .catch(() => setErro("Erro ao carregar perfil."))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const onSubmit = async (data) => {
    setErro("");
    setSucesso(false);
    setSalvando(true);
    try {
      const atualizado = await usuarioService.atualizar(user.id, data);
      setDados(atualizado);
      updateUser({ ...user, nomeUsuario: atualizado.nomeUsuario });
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-lg p-8 animate-pulse space-y-4">
            <div className="bg-gray-200 h-6 rounded w-1/3" />
            <div className="bg-gray-200 h-10 rounded" />
            <div className="bg-gray-200 h-10 rounded" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h1>

        <div className="bg-white rounded-lg p-6 mb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#febd69] flex items-center justify-center text-2xl font-bold text-gray-900">
              {dados?.nomeUsuario?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
            <div>
              <p className="font-bold text-gray-800">{dados?.nomeUsuario}</p>
              <p className="text-sm text-gray-500">{dados?.emailUsuario}</p>
            </div>
          </div>

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm mb-4">
              ⚠ {erro}
            </div>
          )}
          {sucesso && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded p-3 text-sm mb-4">
              ✓ Perfil atualizado com sucesso!
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-[#febd69] focus:ring-1 focus:ring-[#febd69] ${errors.nomeUsuario ? "border-red-400" : "border-gray-300"}`}
                {...register("nomeUsuario")}
              />
              {errors.nomeUsuario && <p className="text-xs text-red-500 mt-1">{errors.nomeUsuario.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                value={dados?.emailUsuario ?? ""}
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
              <input
                type="number"
                min={1}
                max={120}
                className={`w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-[#febd69] focus:ring-1 focus:ring-[#febd69] ${errors.idadeUsuario ? "border-red-400" : "border-gray-300"}`}
                {...register("idadeUsuario")}
              />
              {errors.idadeUsuario && <p className="text-xs text-red-500 mt-1">{errors.idadeUsuario.message}</p>}
            </div>

            <button
              type="submit"
              disabled={salvando}
              className="w-full py-2 bg-[#febd69] hover:bg-[#f3a847] rounded-full font-medium text-gray-900 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
