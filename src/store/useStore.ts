import type { CompanyData, Product } from '@/types/types'
import { create } from 'zustand'
import productList from '@/assets/data/products.json'
import companyList from '@/assets/data/companies.json'

type ProductStore = {
  products: Product[]
  companies: CompanyData[]
  isLoggedIn: boolean
  setIsLoggedIn: (isLogged: boolean) => void
  setProducts: (newProducts: Product[]) => void
  addProduct: (newProduct: Product) => void
  removeProduct: (productId: string | number) => void
  userData: CompanyData
  setUserData: (userData: CompanyData) => void
}

//TODO: Handle filter
export const useStore = create<ProductStore>((set) => ({
  products: productList,
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn: isLoggedIn })),
  companies: companyList,
  setProducts: (newProducts) => set(() => ({ products: newProducts })),
  addProduct: (newProduct) =>
    set((state) => ({ products: [...state.products, newProduct] })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  userData: companyList[0],
  setUserData: (userData) => set(() => ({ userData: userData })),
}))
