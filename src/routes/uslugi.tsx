import { Filters } from '@/components/Filters'
import { ProductList } from '@/components/ProductList'
import { Form } from '@/components/ui/form'
import { useProducts } from '@/hooks/use-products'
import { filterProducts, isFilterActive } from '@/lib/utils'
import type { Item } from '@/types/types'
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/uslugi')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath })
  const search = useSearch({
    from: Route.fullPath,
  })
  const { getAllItems } = useProducts()
  const { watch, ...form } = useForm()

  const [currentProducts, setCurrentProducts] = useState<Item[]>(
      getAllItems('SERVICE'),
  )

  const getProducts = (filters: { [x: string]: any }) => {
    const hasFilters = Object.entries(filters).some(([_, value]) => isFilterActive(value))
    if (!hasFilters) {
      return setCurrentProducts(getAllItems('SERVICE'))
    }
    setCurrentProducts(filterProducts(getAllItems('SERVICE'), filters))
  }

  useEffect(() => {
    Object.entries(search).forEach(([key, value]) => form.setValue(key, value))
    getProducts(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { unsubscribe } = watch((filters) => {
      getProducts(filters)
      const filteredSearch = Object.fromEntries(
          Object.entries(filters).filter(
              ([key, value]) =>
                  !!value && Array.isArray(value) && value.length,
          ),
      )
      navigate({
        search: filteredSearch as any,
        replace: true,
        resetScroll: false,
      })
    })
    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch])

  return (
      <section className="container">
        <div className="grid grid-flow-col grid-cols-[auto_1fr] gap-30">
          <Form watch={watch} {...form}>
            <Filters type="SERVICE" />
            <ProductList products={currentProducts} type="SERVICE" />
          </Form>
        </div>
      </section>
  )
}
