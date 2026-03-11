import { useState } from "react";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { SearchBar } from "./components/SearchBar/SearchBar";
import "./App.css";

const mockProducts = [
    {
        id: 1,
        title: "Смарт-часы X100",
        price: 7490,
        image: "https://picsum.photos/seed/watch/600/400",
        description: "Водонепроницаемые, GPS, 7-дневный аккумулятор.",
    },
    {
        id: 2,
        title: "Беспроводные наушники AirBeats",
        price: 5990,
        image: "https://picsum.photos/seed/headphones/600/400",
        description: "Активное шумоподавление и до 30 часов автономности.",
    },
    {
        id: 3,
        title: "Портативная колонка Boom Mini",
        price: 3290,
        image: "https://picsum.photos/seed/speaker/600/400",
        description: "Компактный корпус, яркий звук и защита от влаги IPX6.",
    },
    {
        id: 4,
        title: "Электрическая зубная щетка CleanPro Электрическая зубная щетка CleanPro Электрическая зубная щетка CleanPro",
        price: 4190,
        image: "https://picsum.photos/seed/toothbrush/600/400",
        description: "5 режимов чистки, таймер и мягкая щетина.",
    },
];

function App() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <main className="catalog-page">
            <header className="catalog-page__header">
                <h1 className="catalog-page__title">Каталог товаров</h1>
            </header>

            <section className="catalog-page__controls">
                <SearchBar
                    value={searchValue}
                    onChange={setSearchValue}
                />
            </section>

            <section
                className="catalog-grid"
                aria-label="Список товаров"
            >
                {mockProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        onClick={() => undefined}
                    />
                ))}
            </section>
        </main>
    );
}

export default App;
