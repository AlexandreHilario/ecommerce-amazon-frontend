const categories =[
    "Eletrocinos",
    "Moda",
    "Games",
    "Livros",
    "Esportes",
    "Móveis",
];

export default function CategoryList() {
    return (
        <selection className="categories">
            {categories.map((category) => (
                <div className="category-card" key={category}>
                    <h3>{category}</h3>
                </div>
            ))}
        </selection>

    );
}