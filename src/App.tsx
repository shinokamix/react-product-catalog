import { useState } from "react";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { SearchBar } from "./components/SearchBar/SearchBar";
import "./App.css";
import { useProducts } from "./hooks/useProducts";

function App() {
    const { products, loading, error } = useProducts();
    const [searchValue, setSearchValue] = useState("");

    if (loading) {
        return (
            <main className="catalog-page">
                <header className="catalog-page__header">
                    <h1 className="catalog-page__title">Загрузка...</h1>
                </header>
            </main>
        );
    }

    if (error) {
        return (
            <main className="catalog-page">
                <header className="catalog-page__header">
                    <h1 className="catalog-page__title">Ошибка: {error}</h1>
                </header>
            </main>
        );
    }

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
                {products.map((product) => (
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
