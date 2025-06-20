import type { CompanyData, Item } from '@/types/types'
import { create } from 'zustand'
import productList from '@/assets/data/products.json'
import serviceList from '@/assets/data/services.json'
import companyList from '@/assets/data/companies.json'

type ProductStore = {
  products: Item[]
  services: Item[]
  companies: CompanyData[]
  setCompanies: (companies: CompanyData[]) => void
  isLoggedIn: boolean
  setIsLoggedIn: (isLogged: boolean) => void
  setProducts: (newProducts: Item[]) => void
  setServices: (newServices: Item[]) => void
  addProduct: (newProduct: Item) => void
  removeProduct: (productId: string | number) => void
  userData: CompanyData
  setUserData: (userData: CompanyData) => void
}

//TODO: Handle filter
export const useStore = create<ProductStore>((set) => ({
  products: productList,
  services: serviceList as any as Item[],
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn: isLoggedIn })),
  companies: companyList,
  setCompanies: (companies) => set(() => ({ companies: companies })),
  setProducts: (newProducts) => set(() => ({ products: newProducts })),
  setServices: (newServices) => set(() => ({ services: newServices })),
  addProduct: (newProduct) =>
    set((state) => ({ products: [...state.products, newProduct] })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  userData: companyList[0],
  setUserData: (userData) => set(() => ({ userData: userData })),
}))
