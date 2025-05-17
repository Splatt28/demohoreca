import { useEffect, useLayoutEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormField, FormLabel } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import categoryList from '@/assets/data/productCategories.json'
import { normalizePolishString } from '@/lib/utils'

export interface Category {
  id: number | string
  name: string
  subCategories: Category[]
}

interface NavigationItem {
  categories: Category[]
  title: string
  selectedCategory?: string
}

type SlideDirection = '' | 'slide-left' | 'slide-right'

interface CategorySidebarProps {
  onCategorySelect?: (category: Category) => void
}
interface CategoryPathResult {
  navigationStack: NavigationItem[]
  currentCategories: Category[]
}

const findCategoryPath = (
  categories: Category[],
  target: string,
  path: NavigationItem[] = [],
  parentCategories: Category[] = [],
): CategoryPathResult | null => {
  for (const category of categories) {
    const normalizedName = normalizePolishString(category.name)
    const hasSubcategories = category.subCategories?.length > 0

    const newPath = hasSubcategories
      ? [
          ...path,
          {
            categories,
            title: path[path.length - 1]?.selectedCategory || '',
            selectedCategory: category.name,
          },
        ]
      : [...path]

    if (normalizedName === target) {
      // currentCategories = siblings (i.e., parent's subcategories)
      // if no parent (root level), currentCategories = root categories
      return {
        navigationStack: newPath,
        currentCategories: hasSubcategories
          ? category.subCategories!
          : parentCategories,
      }
    }

    if (hasSubcategories) {
      const result = findCategoryPath(
        category.subCategories,
        target,
        newPath,
        category.subCategories,
      )
      if (result) return result
    }
  }

  return null
}
const findCategorySubcategories = (
  categories: Category[],
  target: string,
): Category[] | null => {
  for (const category of categories) {
    const normalizedName = normalizePolishString(category.name)

    if (normalizedName === target) {
      return category.subCategories || []
    }

    if (category.subCategories?.length) {
      const result = findCategorySubcategories(category.subCategories, target)
      if (result) return result
    }
  }

  return null
}

const findCategoryByNormalizedName = (
  categories: Category[],
  target: string,
): Category | null => {
  for (const category of categories) {
    const normalized = normalizePolishString(category.name)
    if (normalized === target) return category

    if (category.subCategories?.length) {
      const found = findCategoryByNormalizedName(category.subCategories, target)
      if (found) return found
    }
  }
  return null
}

export const CategoriesList = ({ onCategorySelect }: CategorySidebarProps) => {
  const navigate = useNavigate()
  const form = useFormContext()
  const [navigationStack, setNavigationStack] = useState<NavigationItem[]>([])
  const [currentCategories, setCurrentCategories] =
    useState<Category[]>(categoryList)
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('')
  const [isBackDisabled, setIsBackDisabled] = useState<boolean>(true)

  const { location } = useRouterState()
  const urlCategory = location.pathname.split('/kategoria/')[1]

  useEffect(() => {
    if (!urlCategory) return

    const normalizedTarget = urlCategory.toLowerCase()
    const result = findCategoryPath(categoryList, normalizedTarget)

    if (result) {
      const { navigationStack, currentCategories } = result
      setIsBackDisabled(navigationStack.length === 1)
      setNavigationStack(navigationStack)
      setCurrentCategories(currentCategories)
      const targetCategory = findCategoryByNormalizedName(
        categoryList,
        normalizedTarget,
      )
      if (targetCategory) {
        form.setValue('category', targetCategory.name)
        if (onCategorySelect) onCategorySelect(targetCategory)
      }
    }
  }, [urlCategory])

  const handleCategoryClick = (category: Category) => {
    const normalizedCategory = normalizePolishString(category.name)
    navigate({
      to: `/kategoria/${normalizedCategory}`,
    })
    if (onCategorySelect) {
      onCategorySelect(category)
    }

    if (category.subCategories && category.subCategories.length > 0) {
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
        setCurrentCategories(category.subCategories)
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
        if (previous?.title) {
          const normalizedCategory = normalizePolishString(previous.title)
          navigate({
            to: `/kategoria/${normalizedCategory}`,
          })
        }
        setSlideDirection('')
      }, 300)
    }
  }

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
            disabled={isBackDisabled}
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
                      <span className="w-50 mr-8 overflow-hidden text-ellipsis">
                        {category.name}
                      </span>
                      {category.subCategories &&
                        category.subCategories.length > 0 && (
                          <ChevronRight className="absolute right-0 mx-2 h-4 w-4 ml-2 flex-shrink-0" />
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
