import {Product} from '@/components/Product'
import type {Category, Item as ProductType, ListType} from '@/types/types'
import {useMatch, useParams} from '@tanstack/react-router'

export const ProductList = ({
                              products,
                              type,
                              categoryName,
                            }: {
  products: ProductType[]
  type: ListType
  categoryName?: string
}) => {


  const isProduct = type === 'PRODUCT';
  const isCategoryRoute = useMatch({
    from: isProduct ? '/kategoria/$categoryId' : '/uslugi/$categoryId'
  }) !== null;
  const data = isCategoryRoute
      ? useParams({
        from: isProduct ? '/kategoria/$categoryId' : '/uslugi/$categoryId',
      })
      : { categoryId: undefined };


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
  const findNodeById = (
    categories: Category[],
    id: string,
  ): Category | undefined => {
    for (const category of categories) {
      if (category.id === id) return category
      const found = findNodeById(category.subCategories, id)
      if (found) return found
    }
    return undefined
  }


  return (
      <section className="">
        <div className="mb-8">
          <h1 className="text-primary font-bold text-3xl mb-1">
            {categoryName ?? "Wszystkie usługi"}
          </h1>
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
  );
};