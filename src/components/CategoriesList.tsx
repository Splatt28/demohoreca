import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormField, FormLabel } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'

// Define TypeScript interfaces
interface Category {
  id: number | string
  name: string
  children: Category[]
}

interface NavigationItem {
  categories: Category[]
  title: string
  selectedCategory?: string
}

const sampleCategories: Category[] = [
  {
    id: 1,
    name: 'Meble',
    children: [],
  },
  {
    id: 2,
    name: 'Jedzenie',
    children: [],
  },
]

type SlideDirection = '' | 'slide-left' | 'slide-right'

interface CategorySidebarProps {
  initialCategories?: Category[]
  onCategorySelect?: (category: Category) => void
}

export const CategoriesList = ({
  initialCategories = sampleCategories,
  onCategorySelect,
}: CategorySidebarProps) => {
  const form = useFormContext()
  const [navigationStack, setNavigationStack] = useState<NavigationItem[]>([])
  const [currentCategories, setCurrentCategories] =
    useState<Category[]>(initialCategories)
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('')

  const handleCategoryClick = (category: Category) => {
    if (onCategorySelect) {
      onCategorySelect(category)
    }

    if (category.children && category.children.length > 0) {
      setSlideDirection('slide-left')
      setTimeout(() => {
        setNavigationStack([
          ...navigationStack,
          {
            categories: currentCategories,
            title:
              navigationStack.length === 0
                ? 'Main Categories'
                : navigationStack[navigationStack.length - 1]
                    .selectedCategory || '',
            selectedCategory: category.name,
          },
        ])
        setCurrentCategories(category.children)
        setSlideDirection('')
      }, 300)
    }
  }

  const handleBack = () => {
    if (navigationStack.length > 0) {
      setSlideDirection('slide-right')
      setTimeout(() => {
        const newStack = [...navigationStack]
        const previous = newStack.pop()
        if (previous) {
          setNavigationStack(newStack)
          setCurrentCategories(previous.categories)
        }
        setSlideDirection('')
      }, 300)
    }
  }

  useEffect(() => {
    setCurrentCategories(initialCategories)
    setNavigationStack([])
  }, [initialCategories])

  return (
    <div className="flex-col">
      <div className="flex items-center justify-between relative">
        <FormLabel className="text-lg text-black/80 font-semibold mb-2">
          Kategorie
        </FormLabel>
        {navigationStack.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-1 h-8 w-8 absolute right-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className={`px-0 transition-all duration-300 ${slideDirection}`}>
          {currentCategories.map((category) => (
            <div key={category.id} className="mb-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  return (
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-left text-gray-700 !p-0 h-auto hover:bg-gray cursor-pointer"
                      onClick={() => {
                        field.onChange(category.name)
                        handleCategoryClick(category)
                      }}
                    >
                      <span>{category.name}</span>
                      {category.children && category.children.length > 0 && (
                        <ChevronRight className="h-4 w-4 ml-2 flex-shrink-0" />
                      )}
                    </Button>
                  )
                }}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
