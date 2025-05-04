import { useProductStore } from '@/store/useProductStore'

import ProdImg1 from '@/assets/skandynawski-fotel-wypoczynkowy.jpg'
import ProdImg2 from '@/assets/stolik-223x232.jpg'
import type { Product } from '@/types'

const productList: Product[] = [
  {
    category: 'obiekt',
    id: '1',
    img: ProdImg1,
    name: 'Krzesło',
    price: 20,
  },
  {
    category: 'obiekt',
    id: '2',
    name: 'Krzesło',
    price: 20,
    img: ProdImg2,
  },
  {
    category: 'artykuly_spozywcze',
    id: '3',
    img: ProdImg1,
    name: 'Krzesło',
    price: 20,
  },
  {
    category: 'obiekt',
    id: '4',
    img: ProdImg2,
    name: 'Krzesło',
    price: 20,
  },
]
export const useProducts = () => {
  const { setProducts } = useProductStore()
  const getItemsByCategory = (category: string) => {
    const newProducts = productList.filter(
      (product) => product.category === category,
    )

    setProducts(newProducts)
  }

  return {
    getItemsByCategory,
  }
}
