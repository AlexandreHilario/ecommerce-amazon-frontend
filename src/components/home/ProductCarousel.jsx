const products = [
    {
        id: 1,
        name: "Headset Gamer",
        price:"R$ 299,99",
        image:""
    },

    {
        id: 2,
        name: "Notebook",
        price: "R$ 3.999",
        image: ""
    },
];

export default function ProductCarousel() {
    return (
        <section className="product">
            <h2>Produtos em Destaque</h2>

            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        
                        <h3>{product.name}</h3>
                        
                        <p>{product.price}</p>

                        <button>Comprar</button>
                    </div>
                ))}
            </div>
        </section>

    );
}