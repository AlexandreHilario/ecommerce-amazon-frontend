export default function Navbar() {
  const categories = [
    "Eletrônicos",
    "Games",
    "Livros",
    "Moda",
    "Informática",
  ];

  return (
    <nav className="bg-[#232f3e] text-white">
      <div className="max-w-7xl mx-auto flex gap-6 px-4 py-3">
        {categories.map((item) => (
          <a
            key={item}
            href="#"
            className="hover:text-[#febd69] transition"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}