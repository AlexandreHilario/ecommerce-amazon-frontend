import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full">
      {/* Barra Principal */}
      <div className="bg-[#131921] text-white flex items-center justify-between px-4 py-2 gap-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="px-2 py-1 border border-transparent hover:border-white rounded"
        >
          <h1 className="text-3xl font-bold tracking-tight">
            amazon
            <span className="text-[#febd69]">.</span>
          </h1>
        </Link>

        {/* Barra de Pesquisa */}
        <div className="hidden md:flex flex-1 items-center h-10 rounded overflow-hidden">
          <select className="h-full bg-gray-100 text-black px-2 border-r border-gray-300 outline-none text-sm cursor-pointer hover:bg-gray-200">
            <option>Todos</option>
          </select>

          <input
            type="text"
            placeholder="Pesquisar Amazon.com.br"
            className="h-full flex-1 px-3 text-black bg-white outline-none"
          />

          <button className="h-full bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center text-black">
            🔍
          </button>
        </div>

        {/* Área do Usuário */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/login"
            className="px-2 py-1 border border-transparent hover:border-white rounded flex flex-col"
          >
            <span className="text-xs text-gray-300">
              Olá, faça seu login
            </span>

            <span className="text-sm font-bold">
              Contas e Listas
            </span>
          </Link>

          <Link
            href="/carrinho"
            className="px-2 py-1 border border-transparent hover:border-white rounded flex items-center gap-2"
          >
            <span className="text-3xl">🛒</span>

            <div className="hidden md:flex flex-col">
              <span className="text-xs text-gray-300">
                Seus itens
              </span>

              <span className="text-sm font-bold">
                Carrinho
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Barra Secundária */}
      <div className="bg-[#232f3e] text-white text-sm flex items-center px-4 py-2 gap-4 overflow-x-auto whitespace-nowrap">
        <button className="flex items-center gap-1 border border-transparent hover:border-white px-1 py-0.5 rounded font-bold">
          ☰ Todos
        </button>

        <Link
          href="/produtos"
          className="border border-transparent hover:border-white px-1 py-0.5 rounded"
        >
          Produtos
        </Link>

        <Link
          href="#"
          className="border border-transparent hover:border-white px-1 py-0.5 rounded"
        >
          Mais Vendidos
        </Link>

        <Link
          href="#"
          className="border border-transparent hover:border-white px-1 py-0.5 rounded"
        >
          Prime
        </Link>

        <Link
          href="#"
          className="border border-transparent hover:border-white px-1 py-0.5 rounded"
        >
          Eletrônicos
        </Link>

        <Link
          href="#"
          className="border border-transparent hover:border-white px-1 py-0.5 rounded"
        >
          Games
        </Link>

        <Link
          href="#"
          className="border border-transparent hover:border-white px-1 py-0.5 rounded"
        >
          Ofertas do Dia
        </Link>
      </div>
    </header>
  );
}