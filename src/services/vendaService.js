const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const getHeaders = () => {
    const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

  export const listarVendas = async (filtros = {}) => {
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filtros).filter(([, v]) => v != null))
  );
 
  const res = await fetch(`${BASE_URL}/vendas?${params}`, {
    method: 'GET',
    headers: getHeaders(),
  });
 
  return handleResponse(res);
};
 
/**
 * Busca uma venda pelo ID
 * @param {string|number} id
 */
export const buscarVenda = async (id) => {
  const res = await fetch(`${BASE_URL}/vendas/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });
 
  return handleResponse(res);
};
 
/**
 // calcula os totais automaticamente antes de enviar
 * @param {Object} venda - { clienteId, itens: [{ produtoId, quantidade, precoUnitario, desconto? }], ... }
 */
export const criarVenda = async (venda) => {
  const totais = calcularTotais(venda.itens || []);
 
  const payload = {
    ...venda,
    ...totais,
    dataCriacao: new Date().toISOString(),
    status: venda.status || 'pendente',
  };
 
  const res = await fetch(`${BASE_URL}/vendas`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
 
  return handleResponse(res);
};
 
/**
 * Edita uma venda existente — recalcula totais se itens forem alterados
 * @param {string|number} id
 * @param {Object} dadosAtualizados
 */
export const editarVenda = async (id, dadosAtualizados) => {
  const totais = dadosAtualizados.itens
    ? calcularTotais(dadosAtualizados.itens)
    : {};
 
  const payload = {
    ...dadosAtualizados,
    ...totais,
    dataAtualizacao: new Date().toISOString(),
  };
 
  const res = await fetch(`${BASE_URL}/vendas/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
 
  return handleResponse(res);
};
 
/**
 * Deleta uma venda pelo ID
 * @param {string|number} id
 */
export const deletarVenda = async (id) => {
  const res = await fetch(`${BASE_URL}/vendas/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
 
  return handleResponse(res);
};