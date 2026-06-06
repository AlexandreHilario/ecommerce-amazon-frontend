export default function OffersSection() {
  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">
        Ofertas do Dia
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-xl">
            Até 70% OFF
          </h3>

          <p>Produtos eletrônicos selecionados.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-xl">
            Frete Grátis
          </h3>

          <p>Compras acima de R$199.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-xl">
            Mais Vendidos
          </h3>

          <p>Confira os produtos favoritos.</p>
        </div>
      </div>
    </section>
  );
}