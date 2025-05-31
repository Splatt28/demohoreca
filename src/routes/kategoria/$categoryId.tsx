import { Filters } from '@/components/Filters'
import { ProductList } from '@/components/ProductList'
import Placeholder from '@/assets/interior.jpg'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { CategoryBanner } from '@/components/CategoryBaner'
import { useProducts } from '@/hooks/use-products'
import type { Item } from '@/types/types'
import { filterProducts } from '@/lib/utils'

export const Route = createFileRoute('/kategoria/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = useParams({ from: '/kategoria/$categoryId' })
  const { getItemsByCategory } = useProducts()

  const [currentProducts, setCurrentProducts] = useState<Item[]>(
    getItemsByCategory(data.categoryId, 'PRODUCT'),
  )

  useEffect(() => {
    setCurrentProducts(getItemsByCategory(data.categoryId, 'PRODUCT'))
  }, [data])

  const { watch, ...form } = useForm()

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
