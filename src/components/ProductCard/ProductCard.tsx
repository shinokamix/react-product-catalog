import "./ProductCard.css";

type ProductCardProps = {
    title: string;
    price: number;
    image: string;
    onClick?: () => void;
};

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(price);
}

export function ProductCard({
    title,
    price,
    image,
    onClick,
}: ProductCardProps) {
    return (
        <article className="product-card">
            <button
                className="product-card__action"
                type="button"
                onClick={onClick}
                disabled={!onClick}
            >
                <img
                    className="product-card__image"
                    src={image}
                    alt={title}
                />
                <section className="product-card__content">
                    <h3 className="product-card__title">{title}</h3>
                    <p className="product-card__price">{formatPrice(price)}</p>
                </section>
            </button>
        </article>
    );
}
