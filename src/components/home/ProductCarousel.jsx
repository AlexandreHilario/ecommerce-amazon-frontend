const products = [
  {
    id: 1,
    name: "Headset Gamer",
    price: "R$ 299",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
  },
  {
    id: 2,
    name: "Notebook",
    price: "R$ 3.999",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
  },
  {
    id: 3,
    name: "Mouse Gamer",
    price: "R$ 199",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
  },
  {
    id: 4,
    name: "Teclado Mecânico",
    price: "R$ 349",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
  },
];

export default function ProductCarousel() {
  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">
        Produtos em Destaque
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-4"
            />

            <h3 className="font-semibold">
              {product.name}
            </h3>

            <p className="font-bold text-green-700">
              {product.price}
            </p>

            <button className="mt-3 bg-yellow-400 px-4 py-2 rounded">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}