import { Filters } from '@/components/Filters'
import { ProductList } from '@/components/ProductList'
import Placeholder from '@/assets/interior.jpg'
import {
  createFileRoute,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { CategoryBanner } from '@/components/CategoryBaner'
import { useProducts } from '@/hooks/use-products'
import type { Item } from '@/types/types'
import { filterProducts, isFilterActive } from '@/lib/utils'

export const Route = createFileRoute('/kategoria/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = useParams({ from: '/kategoria/$categoryId' })
  const navigate = useNavigate({ from: Route.fullPath })
  const search = useSearch({
    from: '/kategoria/$categoryId',
  })
  const { getItemsByCategory } = useProducts()

  const [currentProducts, setCurrentProducts] = useState<Item[]>(
    getItemsByCategory(data.categoryId, 'PRODUCT'),
  )

  useEffect(() => {
    setCurrentProducts(getItemsByCategory(data.categoryId, 'PRODUCT'))
  }, [data])

  const { watch, ...form } = useForm()

  const getProducts = (filters: { [x: string]: any }) => {
    const hasNonCategoryFilters = Object.entries(filters).some(
      ([key, value]) => {
        return key !== 'category' && isFilterActive(value)
      },
    )
    if (!hasNonCategoryFilters) {
      return setCurrentProducts(getItemsByCategory(data.categoryId, 'PRODUCT'))
    }
    setCurrentProducts(filterProducts(currentProducts, filters))
  }

  useEffect(() => {
    Object.entries(search).forEach(([key, value]) => form.setValue(key, value))
    getProducts(search)
  }, [])

  useEffect(() => {
    const { unsubscribe } = watch((filters) => {
      getProducts(filters)
      const filteredSearch = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => {
          return (
            key !== 'category' &&
            ((Array.isArray(value) && value.length > 0) || value === true)
          )
        }),
      )
      navigate({
        search: filteredSearch as any,
        replace: true,
        resetScroll: false,
      })
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
