// src/api/products.ts
import type {
    DummyJsonProduct,
    DummyJsonProductsResponse,
    Product,
    ProductsResponse,
} from "../types/product";

const PRODUCTS_URL = "https://dummyjson.com/products?limit=0";

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isDummyJsonProduct(value: unknown): value is DummyJsonProduct {
    if (!isObject(value)) return false;

    return (
        typeof value.id === "number" &&
        typeof value.title === "string" &&
        typeof value.price === "number" &&
        typeof value.category === "string" &&
        typeof value.thumbnail === "string" &&
        Array.isArray(value.images) &&
        value.images.every((item) => typeof item === "string") &&
        typeof value.description === "string"
    );
}

function isDummyJsonProductsResponse(
    value: unknown,
): value is DummyJsonProductsResponse {
    if (!isObject(value)) return false;

    const { products, total, skip, limit } = value;

    return (
        Array.isArray(products) &&
        products.every(isDummyJsonProduct) &&
        typeof total === "number" &&
        typeof skip === "number" &&
        typeof limit === "number"
    );
}

function mapProduct(item: DummyJsonProduct): Product {
    return {
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category,
        image: item.thumbnail,
        modalImage: item.images[0] ?? item.thumbnail,
        description: item.description,
    };
}

export async function fetchProducts(
    signal?: AbortSignal,
): Promise<ProductsResponse> {
    const response = await fetch(PRODUCTS_URL, { signal });

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isDummyJsonProductsResponse(data)) {
        throw new Error("Invalid products response shape");
    }

    return {
        products: data.products.map(mapProduct),
        total: data.total,
        skip: data.skip,
        limit: data.limit,
    };
}
