import { ProductList } from '@/components/ProductList'
import { useProducts } from '@/hooks/use-products'
import { filterProducts, isFilterActive } from '@/lib/utils'
import type { Item } from '@/types/types'
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const Route = createFileRoute('/uslugi/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath })
  const data = useParams({ from: Route.fullPath })
  const { getItemsByCategory } = useProducts()
  const { watch } = useFormContext()

  const [currentProducts, setCurrentProducts] = useState<Item[]>(
    getItemsByCategory(data.categoryId, 'SERVICE'),
  )

  const getProducts = useCallback(
    (filters: { [x: string]: any }) => {
      const hasNonCategoryFilters = Object.entries(filters).some(
        ([key, value]) => {
          return key !== 'category' && isFilterActive(value)
        },
      )
      if (!hasNonCategoryFilters) {
        return setCurrentProducts(
          getItemsByCategory(data.categoryId, 'SERVICE'),
        )
      }
      setCurrentProducts(filterProducts(currentProducts, filters))
    },
    [currentProducts, data.categoryId, getItemsByCategory],
  )

  useEffect(() => {
    const { unsubscribe } = watch((filters) => {
      getProducts(filters)
      const filteredSearch = Object.fromEntries(
        Object.entries(filters).filter(
          ([key, value]) =>
            key !== 'category' &&
            !!value &&
            Array.isArray(value) &&
            value.length,
        ),
      )

      navigate({
        search: filteredSearch as any,
        replace: true,
        resetScroll: false,
      })
    })
    return () => unsubscribe()
  }, [watch, navigate, getProducts])

  return <ProductList products={currentProducts} type="SERVICE" />
}
