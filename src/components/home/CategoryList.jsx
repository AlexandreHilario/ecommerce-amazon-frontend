const categories = [
  "Eletrônicos",
  "Games",
  "Livros",
  "Moda",
  "Casa",
  "Celulares",
  "Informática",
  "Esportes",
];

export default function CategoryList() {
  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">
        Categorias
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="font-semibold text-center">
              {category}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}