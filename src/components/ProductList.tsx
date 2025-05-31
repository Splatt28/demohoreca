import { Product } from '@/components/Product'
import { findCategoryByNormalizedName } from '@/lib/utils'
import type { ListType, Item as ProductType } from '@/types/types'
import { useParams } from '@tanstack/react-router'
import productCategoryList from '@/assets/data/productCategories.json'
import serviceCategoryList from '@/assets/data/serviceCategories.json'

export const ProductList = ({
  products,
  type,
}: {
  products: ProductType[]
  type: ListType
}) => {
  const data = useParams({
    from: type === 'PRODUCT' ? '/kategoria/$categoryId' : '/uslugi/$categoryId',
    shouldThrow: false,
  })
  const getProductNumber = (liczba: number): string => {
    const mod10 = liczba % 10
    const mod100 = liczba % 100

    if (liczba === 1) {
      return `${liczba} produkt`
    }

    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return `${liczba} produkty`
    }

    return `${liczba} produktów`
  }

  return (
    <section className="">
      <div className="mb-8">
        <p className="text-black/30">{getProductNumber(products.length)}</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {products
          .filter((product) => product.available)
          .map((product) => (
            <Product key={product.id} {...product} />
          ))}
      </div>
    </section>
  )
}
