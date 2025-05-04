import { Filters } from '@/components/Filters'
import { ProductList } from '@/components/ProductList'
import Placeholder from '@/assets/interior.jpg'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useEffect } from 'react'
import { CategoryBanner } from '@/components/CategoryBaner'
import { useProducts } from '@/hooks/use-products'

export const Route = createFileRoute('/kategoria/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = useParams({ from: '/kategoria/$categoryId' })
  const { getItemsByCategory } = useProducts()

  const { watch, ...form } = useForm({
    defaultValues: {
      items: [],
      price: [],
      category: '',
    },
  })

  useEffect(() => {
    getItemsByCategory(data.categoryId)
  }, [data])

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      console.log(value)
    })
    return () => unsubscribe()
  }, [watch])

  //TODO: Handle category banners based on url data.categoryid
  return (
    <section>
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
          <Filters />
          <ProductList />
        </Form>
      </div>
    </section>
  )
}
