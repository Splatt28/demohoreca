import { Filters } from '@/components/Filters'
import { ProductList } from '@/components/ProductList'
import Placeholder from '@/assets/interior.jpg'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { CategoryBanner } from '@/components/CategoryBaner'
import { useProducts } from '@/hooks/use-products'
import type { Product } from '@/types/types'

export const Route = createFileRoute('/kategoria/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = useParams({ from: '/kategoria/$categoryId' })
  const { getItemsByCategory } = useProducts()

  const [currentProducts, setCurrentProducts] = useState<Product[]>(
    getItemsByCategory(data.categoryId),
  )

  useEffect(() => {
    setCurrentProducts(getItemsByCategory(data.categoryId))
  }, [data])

  const { watch, ...form } = useForm()
  function isFilterActive(value: any): boolean {
    if (value === undefined || value === null) return false
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'string') return value.trim() !== ''
    return true
  }

  const filterProducts = (
    products: Product[],
    filters: { [x: string]: any },
  ): Product[] => {
    const hasNonCategoryFilters = Object.entries(filters).some(
      ([key, value]) => {
        return key !== 'category' && isFilterActive(value)
      },
    )
    if (!hasNonCategoryFilters) {
      return products
    }
    return products.filter((product) => {
      for (const [filterKey, filterValue] of Object.entries(filters)) {
        if (
          filterValue === undefined ||
          filterKey === 'category' ||
          !filterValue.length
        ) {
          continue
        }
        const productValue = product.attributes[filterKey]
        if (Array.isArray(filterValue)) {
          if (typeof productValue === 'string') {
            const matches = filterValue.some((val) =>
              productValue
                .toLocaleLowerCase()
                .includes(val.toLocaleLowerCase()),
            )
            if (!matches) return false
          } else {
            return false
          }
        } else {
          if (
            typeof productValue === 'string' &&
            !productValue
              .toLocaleLowerCase()
              .includes(String(filterValue).toLocaleLowerCase())
          ) {
            return false
          }
        }
      }

      return true
    })
  }

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      setCurrentProducts(filterProducts(currentProducts, value))
    })
    return () => unsubscribe()
  }, [watch])

  //TODO: Handle category banners based on url data.categoryid
  return (
    <section className="container">
      <CategoryBanner imageSrc={Placeholder}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed
          convallis magna. In hac habitasse platea dictumst. Suspendisse
          dapibus, lorem eget sodales rhoncus, augue ante imperdiet ipsum, quis
          rutrum elit velit viverra nibh. Pellentesque et sem eget nulla
          elementum aliquam nec posuere sapien. Nullam et fringilla libero.
          Curabitur eget nisi blandit, porttitor magna ut, tempor nunc. Etiam
          gravida erat volutpat felis pellentesque, aliquam gravida sapien
          egestas. Fusce at purus sit amet nisl lacinia imperdiet ac nec erat.
          Nunc suscipit tempor molestie.
        </p>
      </CategoryBanner>
      <div className="grid grid-flow-col grid-cols-[auto_1fr] gap-30">
        <Form watch={watch} {...form}>
          <Filters type="PRODUCT" />
          <ProductList products={currentProducts} type="PRODUCT" />
        </Form>
      </div>
    </section>
  )
}
