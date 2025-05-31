import { CategoriesList } from '@/components/CategoriesList'
import { CheckboxList } from '@/components/CheckboxList'
import { FilterSlider } from '@/components/FilterSlider'
import { Radio } from '@/components/Radio'
import { Checkbox } from '@/components/ui/checkbox'
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
  const data = useParams({
    from: type === 'PRODUCT' ? '/kategoria/$categoryId' : '/uslugi/$categoryId',
  })
  const { getItemsByCategory, getFiltersFromProducts } = useProducts()
  const filtersList = getFiltersFromProducts(
    getItemsByCategory(data.categoryId, type),
  )
    .map((filter) => {
      return {
        value: filter,
        ...filterMap[filter as keyof typeof filterMap],
      }
    })
    .filter(Boolean)

  const getUniqueAttributeValues = (attributeName: string) => {
    const rawValues = getItemsByCategory(data.categoryId, type).flatMap(
      (product): (string | number | boolean)[] => {
        const value = product.attributes[attributeName]

        if (typeof value === 'string') {
          return value
            .split(',')
            .map((v) => v.trim().toLowerCase())
            .filter((v) => v.length > 0) // Split comma-separated strings
        }

        if (value !== undefined) {
          return Array.isArray(value) ? value : [value] // Include numbers, booleans
        }

        return []
      },
    )

    const uniqueValues = Array.from(new Set(rawValues))

    return uniqueValues.map((val) => ({ label: val, id: val }))
  }

  const getRangeValues = (attributeName: string) => {
    const rawValues = getItemsByCategory(data.categoryId, type).flatMap(
      (product): (string | number | boolean)[] => {
        const value = product.attributes[attributeName]

        if (typeof value === 'string') {
          return value
            .split(',')
            .map((v) => v.trim().toLowerCase())
            .filter((v) => v.length > 0) // Split comma-separated strings
        }

        if (value !== undefined) {
          return Array.isArray(value) ? value : [value] // Include numbers, booleans
        }

        return []
      },
    )
    return [
      Math.min(...(rawValues as number[])),
      Math.max(...(rawValues as number[])),
    ]
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
            key={type}
          />
        )
      case FilterType.Selection:
        return <Radio key={type} listLabel={type} fieldName={type} />

      case FilterType.Range:
        const range = getRangeValues(type)
        if (range.length < 2 || range[0] === range[1]) {
          return
        }
        return (
          <FilterSlider
            key={type}
            label={label}
            fieldName={type}
            min={range[0]}
            max={range[1]}
          />
        )
    }
  }
  return (
    <div className="flex gap-6 flex-col">
      <CategoriesList type={type} />
      {filtersList.map((filter) =>
        getFilterComponent(filter.value, filter.type, filter.label),
      )}
    </div>
  )
}
