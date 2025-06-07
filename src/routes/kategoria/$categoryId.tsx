import { Filters } from '@/components/Filters'
import { ProductList } from '@/components/ProductList'
import {
  createFileRoute,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useCallback, useEffect, useState } from 'react'
import { CategoryBanner } from '@/components/CategoryBaner'
import { useProducts } from '@/hooks/use-products'
import type { Item } from '@/types/types'
import {
  filterProducts,
  findCategoryByNormalizedName,
  isFilterActive,
} from '@/lib/utils'
import productCategoryList from '@/assets/data/productCategories.json'

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
  const { watch, ...form } = useForm()
  const { setValue } = form
  const categoryProducts = getItemsByCategory(data.categoryId, 'PRODUCT')

  useEffect(() => {
    setCurrentProducts(getItemsByCategory(data.categoryId, 'PRODUCT'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const getProducts = useCallback(
    (filters: { [x: string]: any }) => {
      const hasNonCategoryFilters = Object.entries(filters).some(
        ([key, value]) => {
          return key !== 'category' && isFilterActive(value)
        },
      )
      if (!hasNonCategoryFilters) {
        return setCurrentProducts(categoryProducts)
      }
      setCurrentProducts(filterProducts(categoryProducts, filters))
    },
    [categoryProducts],
  )

  useEffect(() => {
    Object.entries(search).forEach(([key, value]) => setValue(key, value))
    getProducts(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [watch, getProducts, navigate])

  //TODO: Handle category banners based on url data.categoryid
  return (
    <section className="container py-8">
      <div className="grid grid-flow-col grid-cols-[auto_1fr] gap-30">
        <Form watch={watch} {...form}>
          <Filters type="PRODUCT" />
          <div>
            <CategoryBanner imageSrc={`/images/${data.categoryId}.jpg`}>
              <>
                <h1 className="font-bold text-3xl mb-1">
                  {data?.categoryId
                    ? findCategoryByNormalizedName(
                        productCategoryList,
                        data.categoryId,
                      )?.name
                    : ''}
                </h1>
              </>
            </CategoryBanner>
            <ProductList products={currentProducts} type="produkt" />
          </div>
        </Form>
      </div>
    </section>
  )
}
