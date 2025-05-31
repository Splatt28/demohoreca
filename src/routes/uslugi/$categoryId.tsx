import { Filters } from '@/components/Filters'
import { ProductList } from '@/components/ProductList'
import { Form } from '@/components/ui/form'
import { useProducts } from '@/hooks/use-products'
import { filterProducts } from '@/lib/utils'
import type { Item } from '@/types/types'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/uslugi/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = useParams({ from: '/uslugi/$categoryId' })
  const { getItemsByCategory } = useProducts()

  const [currentProducts, setCurrentProducts] = useState<Item[]>(
    getItemsByCategory(data.categoryId, 'SERVICE'),
  )

  useEffect(() => {
    setCurrentProducts(getItemsByCategory(data.categoryId, 'SERVICE'))
  }, [data])

  const { watch, ...form } = useForm()

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      setCurrentProducts(filterProducts(currentProducts, value))
    })
    return () => unsubscribe()
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
