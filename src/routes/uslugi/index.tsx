import { createFileRoute, useNavigate } from '@tanstack/react-router'
import services from '@/assets/data/services.json'
import { ProductList } from '@/components/ProductList'
import type { Item } from '@/types/types'
import { useCallback, useEffect, useState } from 'react'
import { filterProducts, isFilterActive } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'

export const Route = createFileRoute('/uslugi/')({
  component: RouteComponent,
})

export default function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { watch } = useFormContext()
  const [currentProducts, setCurrentProducts] = useState<Item[]>(
    services as any as Item[],
  )
  const getProducts = useCallback(
    (filters: { [x: string]: any }) => {
      const hasNonCategoryFilters = Object.entries(filters).some(
        ([key, value]) => {
          return key !== 'category' && isFilterActive(value)
        },
      )
      if (!hasNonCategoryFilters) {
        return setCurrentProducts(services as any as Item[])
      }
      setCurrentProducts(filterProducts(currentProducts, filters))
    },
    [currentProducts],
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
    return () => {
      unsubscribe()
    }
  }, [watch, navigate, getProducts])

  return <ProductList products={currentProducts} type="SERVICE" />
}
