export default function Header() {
  return (
    <header className="bg-[#131921] text-white">
      <div className="flex items-center gap-4 px-6 py-3">
        <h1 className="text-2xl font-bold">
          Amazon 
        </h1>

        <input
          type="text"
          placeholder="Pesquisar produtos..."
          className="flex-1 rounded-md px-4 py-3 text-white"
        />

        <button className="bg-[#febd69] text-black px-4 py-3 rounded-md">
          Carrinho
        </button>
      </div>
    </header>
  );
}