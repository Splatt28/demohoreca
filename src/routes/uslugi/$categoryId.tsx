import { Filters } from '@/components/Filters'
import { Map } from '@/components/Map'
import { ProductList } from '@/components/ProductList'
import { Form } from '@/components/ui/form'
import { useProducts } from '@/hooks/use-products'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/uslugi/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = useParams({ from: '/uslugi/$categoryId' })

  const { getItemsByCategory } = useProducts()
  const { watch, ...form } = useForm({
    defaultValues: {
      items: [],
      price: [],
      category: '',
    },
  })
  return (
    <section className="container">
      <div className="grid grid-flow-col grid-cols-[auto_1fr] gap-30">
        <Form watch={watch} {...form}>
          <Filters type="SERVICE" />
          <ProductList
            products={getItemsByCategory(data.categoryId)}
            type="SERVICE"
          />
        </Form>
      </div>
    </section>
  )
}
