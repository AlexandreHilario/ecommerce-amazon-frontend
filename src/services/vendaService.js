const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const getHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

//
// 🔥 FINALIZAR COMPRA (CHECKOUT)
// POST /vendas/finalizar/{usuarioId}
//
export const finalizarCompra = async (usuarioId) => {
  const res = await fetch(
    `${BASE_URL}/vendas/finalizar/${usuarioId}`,
    {
      method: "POST",
      headers: getHeaders(),
    }
  );

  if (!res.ok) throw new Error("Erro ao finalizar compra");

  return res.json();
};

//
// 🔥 HISTÓRICO DE PEDIDOS
// GET /vendas/historico/{usuarioId}
//
export const historicoPedidos = async (usuarioId) => {
  const res = await fetch(
    `${BASE_URL}/vendas/historico/${usuarioId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!res.ok) throw new Error("Erro ao buscar pedidos");

  return res.json();
};

//
// 🔥 DETALHE DO PEDIDO
// GET /vendas/{id}
//
export const buscarPedido = async (id) => {
  const res = await fetch(`${BASE_URL}/vendas/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Erro ao buscar pedido");

  return res.json();
};

//
// 🔥 LISTAR TODAS (ADMIN)
// GET /vendas/listar
//
export const listarVendas = async () => {
  const res = await fetch(`${BASE_URL}/vendas/listar`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Erro ao listar vendas");

  return res.json();
};

//
// 🔥 ALTERAR STATUS DO PEDIDO
// PATCH /vendas/{id}/status?status=ENTREGUE
//
export const atualizarStatusVenda = async (id, status) => {
  const res = await fetch(
    `${BASE_URL}/vendas/${id}/status?status=${status}`,
    {
      method: "PATCH",
      headers: getHeaders(),
    }
  );

  if (!res.ok) throw new Error("Erro ao atualizar status");

  return res.json();
};