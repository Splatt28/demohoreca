import type { Product, UserData } from '@/types/types'
import { create } from 'zustand'
import productList from '@/assets/data/products.json'

type ProductStore = {
  products: Product[]
  setProducts: (newProducts: Product[]) => void
  addProduct: (newProduct: Product) => void
  removeProduct: (productId: string | number) => void
  userData: UserData
  setUserData: (userData: UserData) => void
}

//TODO: Handle filter
export const useStore = create<ProductStore>((set) => ({
  products: productList,
  setProducts: (newProducts) => set(() => ({ products: newProducts })),
  addProduct: (newProduct) =>
    set((state) => ({ products: [...state.products, newProduct] })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  userData: {
    personalData: {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jan.kowalski@example.com',
      phone: '+48 123 456 789',
      address: 'ul. Przykładowa 123, 00-001 Warszawa',
    },
    publicData: {
      companyName: 'Sklep Jana',
      description: 'Najlepsze produkty w najlepszych cenach',
      website: 'www.sklepjana.pl',
      socialMedia: 'instagram.com/sklepjana',
    },
  },
  setUserData: (userData) => set(() => ({ userData: userData })),
}))
