import { useStore } from '@/store/useStore'
import type { Category, ListType, Item } from '@/types/types.ts'
import productCategoryList from '@/assets/data/productCategories.json'
import serviceCategoryList from '@/assets/data/serviceCategories.json'

const findCategoryBySlug = (
  slug: string,
  categories: Category[],
): Category | null => {
  for (const cat of categories) {
    if (cat.slug === slug) return cat
    if (cat.subCategories?.length) {
      const found = findCategoryBySlug(slug, cat.subCategories)
      if (found) return found
    }
  }
  return null
}

const collectCategoryIds = (category: Category): string[] => {
  const ids = [String(category.id)]
  if (category.subCategories?.length) {
    for (const sub of category.subCategories) {
      ids.push(...collectCategoryIds(sub))
    }
  }
  return ids
}

export const useProducts = () => {
  const { products, services } = useStore()

  const getItemsByCategory = (slug: string, type: ListType) => {
    const matchedCategory = findCategoryBySlug(
      slug,
      type === 'PRODUCT' ? productCategoryList : serviceCategoryList,
    )

    if (!matchedCategory) return []

    const categoryIds = collectCategoryIds(matchedCategory)
    const itemSet = type === 'PRODUCT' ? products : services
    return itemSet.filter((product) =>
      categoryIds.includes(String(product.categoryId)),
    )
  }

  const getAllItems = (type: ListType) => {
    return type === 'PRODUCT' ? products : services
  }

  const getFiltersFromProducts = (products: Item[]) => {
    return Array.from(
      new Set(products.flatMap((product) => Object.keys(product.attributes))),
    )
  }

  return {
    getItemsByCategory,
    getFiltersFromProducts,
    getAllItems
  }
}
