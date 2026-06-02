export default function Banner() {
  return (
    <section className="relative">
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        alt="Banner"
        className="w-full h-[450px] object-cover"
      />

      <div className="absolute top-1/3 left-10 text-white">
        <h1 className="text-5xl font-bold mb-4">
          Mega Promoções
        </h1>

        <p className="text-xl mb-4">
          Até 50% OFF em produtos selecionados
        </p>

        <button className="bg-[#febd69] text-black px-6 py-3 rounded-md font-bold">
          Comprar Agora
        </button>
      </div>
    </section>
  );
}