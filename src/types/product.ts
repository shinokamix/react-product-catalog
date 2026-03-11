export type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    modalImage: string;
    description: string;
};

export type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export type DummyJsonProduct = {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
    images: string[];
    description: string;
};

export type DummyJsonProductsResponse = {
    products: DummyJsonProduct[];
    total: number;
    skip: number;
    limit: number;
};
