import { CategoriesList } from '@/components/CategoriesList'
import { CheckboxList } from '@/components/CheckboxList'
import { PriceSlider } from '@/components/PriceSlider'

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
export const Filters = () => {
  return (
    <div className="flex gap-6 flex-col">
      <CategoriesList />
      <CheckboxList listLabel="Kolory" items={items} />
      <PriceSlider />
    </div>
  )
}
