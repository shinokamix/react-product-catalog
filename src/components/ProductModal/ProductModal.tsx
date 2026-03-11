import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from "react";
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
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) {
            return;
        }

        if (isOpen && product) {
            if (!dialog.open) {
                dialog.showModal();
            }
        } else if (dialog.open) {
            dialog.close();
        }

        return () => {
            if (dialog.open) {
                dialog.close();
            }
        };
    }, [isOpen, product]);

    if (!isOpen || !product) {
        return null;
    }

    const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleCancel = (event: SyntheticEvent<HTMLDialogElement, Event>) => {
        event.preventDefault();
        onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            className="product-modal"
            onClick={handleBackdropClick}
            onCancel={handleCancel}
            aria-labelledby="product-modal-title"
        >
            <section
                className="product-modal__dialog"
            >
                <button
                    className="product-modal__close"
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть"
                    autoFocus
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
        </dialog>
    );
}
