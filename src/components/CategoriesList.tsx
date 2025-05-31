import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormField, FormLabel } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import productCategoryList from '@/assets/data/productCategories.json'
import serviceCategoryList from '@/assets/data/serviceCategories.json'
import { findCategoryByNormalizedName, findCategoryPath } from '@/lib/utils'
import type {
    Category,
    CategorySidebarProps,
    NavigationItem,
    SlideDirection,
} from '@/types/types'

type Props = CategorySidebarProps & { categoryId?: string }

export const CategoriesList = ({
                                   onCategorySelect,
                                   type,
                                   categoryId,
                               }: Props) => {
    const form = useFormContext()
    const [categoryList, setCategoryList] = useState(
        type === 'PRODUCT' ? productCategoryList : serviceCategoryList,
    )
    const [navigationStack, setNavigationStack] = useState<NavigationItem[]>([])
    const [currentCategories, setCurrentCategories] =
        useState<Category[]>(categoryList)
    const [slideDirection, setSlideDirection] = useState<SlideDirection>('')
    const [isBackDisabled, setIsBackDisabled] = useState<boolean>(
        type === 'PRODUCT',
    )

    useEffect(() => {
        setCategoryList(
            type === 'PRODUCT' ? productCategoryList : serviceCategoryList,
        )
    }, [type])

    useEffect(() => {
        setCurrentCategories(categoryList)
    }, [categoryList])

    useEffect(() => {
        if (!categoryId) return

        const normalizedTarget = categoryId.toLowerCase()
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
    }, [categoryId, categoryList])

    const handleCategoryClick = (category: Category) => {
        const normalizedCategory = category.slug
        if (onCategorySelect) {
            onCategorySelect(category)
        }

        if (category.subCategories && category.subCategories.length > 0) {
            setTimeout(() => {
                setNavigationStack([
                    ...navigationStack,
                    {
                        categories: currentCategories,
                        currentCategory:
                        navigationStack[navigationStack.length - 1]?.currentCategory,
                    },
                ])
                setCurrentCategories(category.subCategories)
                setSlideDirection('')
            }, 300)
        }
    }

    const handleBack = () => {
        if (navigationStack.length > 0) {
            setTimeout(() => {
                const newStack = [...navigationStack]
                newStack.pop() // remove current
                const previous = newStack.pop()
                if (previous?.currentCategory) {
                    // Nawigacja do poprzedniej kategorii - logika nawigacji jest teraz wyżej
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
