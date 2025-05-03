import type { Product as ProductProps } from '@/types'
import { Product } from '@/components/Product'

type ProductListProps = {
  products: ProductProps[]
}
export const ProductList = ({ products }: ProductListProps) => {
  return (
    <section className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <Product {...product} />
      ))}
    </section>
  )
}
