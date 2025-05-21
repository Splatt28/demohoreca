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
      return filterMap[filter as keyof typeof filterMap]
    })
    .filter(Boolean)

  const getFilterComponent = (type: FilterType, label: string) => {
    switch (type) {
      case FilterType.Input:
        return <Input />
      case FilterType.MultiSelection:
        return <CheckboxList listLabel={label} items={items} />
      case FilterType.Selection:
        return <CheckboxList listLabel={label} items={items} />
      case FilterType.Range:
        return <FilterSlider label={label} />
    }
  }
  return (
    <div className="flex gap-6 flex-col">
      <CategoriesList type={type} />
      {filtersList.map((filter) => (
        <>{getFilterComponent(filter.type, filter.label)}</>
      ))}
    </div>
  )
}
