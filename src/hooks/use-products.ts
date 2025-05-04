import { useStore } from '@/store/useStore'

export const useProducts = () => {
  const { products } = useStore()
  const getItemsByCategory = (category: string) => {
    const filteredProducts = products.filter(
      (product) => product.category === category,
    )
    return filteredProducts
  }

  return {
    getItemsByCategory,
  }
}
