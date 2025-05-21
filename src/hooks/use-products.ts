import { useStore } from '@/store/useStore'
import type { Category, Product } from '@/types/types.ts'
import productCategoryList from '@/assets/data/productCategories.json'

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
  const { products } = useStore()

  const getItemsByCategory = (slug: string) => {
    const matchedCategory = findCategoryBySlug(slug, productCategoryList)

    if (!matchedCategory) return []

    const categoryIds = collectCategoryIds(matchedCategory)

    return products.filter((product) =>
      categoryIds.includes(String(product.categoryId)),
    )
  }

  const getFiltersFromProducts = (products: Product[]) => {
    return Array.from(
      new Set(products.flatMap((product) => Object.keys(product.attributes))),
    )
  }

  return {
    getItemsByCategory,
    getFiltersFromProducts,
  }
}
