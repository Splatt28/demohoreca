import type { Product } from '@/types'
import { create } from 'zustand'

interface ProductStore {
  products: Product[]
  setProducts: (newProducts: Product[]) => void
}

//TODO: Handle filter
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (newProducts) => set(() => ({ products: newProducts })),
}))
