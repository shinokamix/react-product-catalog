export type UseProductsResult = {
  products: []
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useProducts(): UseProductsResult {
  return {
    products: [],
    loading: false,
    error: null,
    refetch: async () => {},
  }
}
