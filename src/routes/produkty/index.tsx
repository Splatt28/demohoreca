import { Filters } from '@/components/Filters'
import { ProductList } from '@/components/ProductList'
import type { Product } from '@/types'
import Placeholder from '@/assets/placeholder.jpg'
import { createFileRoute } from '@tanstack/react-router'
import ProdImg1 from '@/assets/skandynawski-fotel-wypoczynkowy.jpg'
import ProdImg2 from '@/assets/stolik-223x232.jpg'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/produkty/')({
  component: RouteComponent,
})

const productList: Product[] = [
  {
    category: 'Meble',
    id: '1',
    img: ProdImg1,
    name: 'Krzesło',
    price: 20,
  },
  {
    category: 'Meble',
    id: '1',
    name: 'Krzesło',
    price: 20,
    img: ProdImg2,
  },
  {
    category: 'Jedzenie',
    id: '1',
    img: ProdImg1,
    name: 'Krzesło',
    price: 20,
  },
  {
    category: 'Meble',
    id: '1',
    img: ProdImg2,
    name: 'Krzesło',
    price: 20,
  },
]

function RouteComponent() {
  const [products, setProducts] = useState<Product[]>(productList)

  const { watch, ...form } = useForm({
    defaultValues: {
      items: [],
      price: [],
      category: '',
    },
  })

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      setProducts(
        productList.filter((product) => product.category === value.category),
      )
    })
    return () => unsubscribe()
  }, [watch])

  return (
    <section>
      <div className="flex mb-8 bg-yellow-800/20 rounded-xl items-center justify-center gap-8 pr-8">
        <img src={Placeholder} className="max-w-64" />
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
      </div>
      <div className="grid grid-flow-col grid-cols-[auto_1fr] gap-30">
        <Form watch={watch} {...form}>
          <Filters />
          <ProductList products={products} />
        </Form>
      </div>
    </section>
  )
}
