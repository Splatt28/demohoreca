import { CategoriesList } from '@/components/CategoriesList'
import { CheckboxList } from '@/components/CheckboxList'
import { FilterSlider } from '@/components/FilterSlider'
import { Input } from '@/components/ui/input'
import { useProducts } from '@/hooks/use-products'
import { filterMap, FilterType } from '@/lib/utils'
import type { ListType } from '@/types/types'
import { useParams } from '@tanstack/react-router'

const items = [
  {
    id: 'recents',
    label: 'Recents',
  },
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'applications',
    label: 'Applications',
  },
  {
    id: 'desktop',
    label: 'Desktop',
  },
  {
    id: 'downloads',
    label: 'Downloads',
  },
  {
    id: 'documents',
    label: 'Documents',
  },
]
export const Filters = ({ type }: { type: ListType }) => {
  const data = useParams({ from: '/kategoria/$categoryId' })
  const { getItemsByCategory, getFiltersFromProducts } = useProducts()
  const filtersList = getFiltersFromProducts(
    getItemsByCategory(data.categoryId),
  )
    .map((filter) => {
      return {
        value: filter,
        ...filterMap[filter as keyof typeof filterMap],
      }
    })
    .filter(Boolean)

  const getUniqueAttributeValues = (attributeName: string) => {
    const rawValues = getItemsByCategory(data.categoryId).flatMap(
      (product): (string | number | boolean)[] => {
        const value = product.attributes[attributeName]

        if (typeof value === 'string') {
          return value
            .split(',')
            .map((v) => v.trim().toLowerCase())
            .filter((v) => v.length > 0) // Split comma-separated strings
        }

        if (value !== undefined) {
          return [value] // Include numbers, booleans
        }

        return []
      },
    )

    const uniqueValues = Array.from(new Set(rawValues))

    return uniqueValues.map((val) => ({ label: val, id: val }))
  }

  const getFilterComponent = (
    type: string,
    filterType: FilterType,
    label: string,
  ) => {
    switch (filterType) {
      case FilterType.Input:
        return <Input />
      case FilterType.MultiSelection:
        return (
          <CheckboxList
            listLabel={label}
            items={getUniqueAttributeValues(type) as any}
            fieldName={type}
          />
        )
      case FilterType.Selection:
        return <CheckboxList listLabel={label} items={items} fieldName={type} />
      case FilterType.Range:
        return <FilterSlider label={label} />
    }
  }
  return (
    <div className="flex gap-6 flex-col">
      <CategoriesList type={type} />
      {filtersList.map((filter) => (
        <>{getFilterComponent(filter.value, filter.type, filter.label)}</>
      ))}
    </div>
  )
}
