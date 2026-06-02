export default function Header() {
  return (
    <header className="bg-[#131921] text-white">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">
        <h1 className="text-2xl font-bold">Amazon Clone</h1>

        <input
          type="text"
          placeholder="Pesquisar produtos..."
          className="flex-1 px-4 py-2 rounded-md text-black"
        />

        <button className="bg-[#febd69] px-4 py-2 rounded-md text-black font-semibold">
          Carrinho
        </button>
      </div>
    </header>
  );
}