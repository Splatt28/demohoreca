import type { Product, UserData } from '@/types/types'
import { create } from 'zustand'
import ProdImg1 from '@/assets/skandynawski-fotel-wypoczynkowy.jpg'
import ProdImg2 from '@/assets/stolik-223x232.jpg'

type ProductStore = {
  products: Product[]
  setProducts: (newProducts: Product[]) => void
  addProduct: (newProduct: Product) => void
  removeProduct: (productId: string | number) => void
  userData: UserData
  setUserData: (userData: UserData) => void
}

const productList: Product[] = [
  {
    category: 'obiekt',
    id: '1',
    images: [ProdImg1],
    name: 'Krzesło',
    price: 20,
    available: true,
    description: 'Lorem ipmum',
    sku: '21521',
    originalPrice: 20,
  },
  {
    category: 'obiekt',
    id: '2',
    name: 'Krzesło',
    price: 20,
    images: [ProdImg2],
    available: true,
    description: 'Lorem ipmum',
    sku: '21521',
    originalPrice: 20,
  },
  {
    category: 'artykuly_spozywcze',
    id: '3',
    images: [ProdImg1],
    name: 'Krzesło',
    price: 20,
    available: true,
    description: 'Lorem ipmum',
    sku: '21521',
    originalPrice: 20,
  },
  {
    category: 'obiekt',
    id: '4',
    images: [ProdImg2],
    name: 'Krzesło',
    price: 15,
    available: true,
    description: 'Lorem ipmum',
    sku: '21521',
    originalPrice: 20,
  },
]
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
