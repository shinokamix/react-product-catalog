import { useEffect, type MouseEvent } from "react";
import type { Product } from "../../types/product";
import "./ProductModal.css";

type ProductModalProps = {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
};

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(price);
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !product) {
        return null;
    }

    const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="product-modal"
            role="presentation"
            onClick={handleBackdropClick}
        >
            <section
                className="product-modal__dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-modal-title"
            >
                <button
                    className="product-modal__close"
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    X
                </button>

                <img
                    className="product-modal__image"
                    src={product.modalImage}
                    alt={product.title}
                />

                <div className="product-modal__content">
                    <h2
                        id="product-modal-title"
                        className="product-modal__title"
                    >
                        {product.title}
                    </h2>
                    <p className="product-modal__description">
                        {product.description}
                    </p>
                    <p className="product-modal__price">
                        {formatPrice(product.price)}
                    </p>
                    <button
                        className="product-modal__buy"
                        type="button"
                    >
                        Купить
                    </button>
                </div>
            </section>
        </div>
    );
}
