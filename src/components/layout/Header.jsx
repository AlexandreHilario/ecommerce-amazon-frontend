"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full">
      {/* Barra Principal (Azul Escuro) */}
      <div className="bg-[#131921] text-white flex items-center justify-between px-4 py-2">
        
        {/* Logo */}
        <Link href="/" className="px-2 py-1 border border-transparent hover:border-white rounded">
          <h1 className="text-2xl font-bold tracking-tighter mt-1">amazon</h1>
        </Link>

        {/* Barra de Pesquisa (Escondida em telas muito pequenas) */}
        <div className="hidden md:flex flex-1 mx-6 items-center h-10 rounded overflow-hidden bg-white">
          <select className="h-full bg-gray-100 text-black px-2 border-r border-gray-300 outline-none text-sm cursor-pointer hover:bg-gray-200">
            <option>Todos</option>
          </select>
          <input 
            type="text" 
            className="h-full flex-1 px-3 bg-white text-black outline-none placeholder-gray-500" 
            placeholder="Pesquisar Amazon.com.br"
          />
          <button className="h-full bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>

        {/* Menu Direito (Login e Carrinho) */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/login" className="px-2 py-1 border border-transparent hover:border-white rounded flex flex-col">
            <span className="text-xs text-gray-300 leading-none">Olá, faça seu login</span>
            <span className="text-sm font-bold leading-none mt-1">Contas e Listas</span>
          </Link>
          
          <Link href="/carrinho" className="px-2 py-1 border border-transparent hover:border-white rounded flex items-center gap-1">
            <span className="text-3xl relative top-1">🛒</span>
            <span className="text-sm font-bold mt-3 hidden md:block">Carrinho</span>
          </Link>
        </div>
      </div>
      
      {/* Barra Secundária (Azul um pouco mais claro) */}
      <div className="bg-[#232f3e] text-white text-sm flex items-center px-4 py-2 gap-4 overflow-x-auto whitespace-nowrap">
        <button className="flex items-center gap-1 border border-transparent hover:border-white px-1 py-0.5 rounded font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          Todos
        </button>
        <Link href="/produtos" className="border border-transparent hover:border-white px-1 py-0.5 rounded">Venda na Amazon</Link>
        <Link href="#" className="border border-transparent hover:border-white px-1 py-0.5 rounded">Mais Vendidos</Link>
        <Link href="#" className="border border-transparent hover:border-white px-1 py-0.5 rounded">Prime</Link>
        <Link href="#" className="border border-transparent hover:border-white px-1 py-0.5 rounded">Eletrônicos</Link>
      </div>
    </header>
  );
}