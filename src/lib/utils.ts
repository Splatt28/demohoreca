import type {
  Category,
  CategoryPathResult,
  NavigationItem,
} from '@/types/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findCategoryPath = (
  categories: Category[],
  target: string,
  path: NavigationItem[] = [],
  parentCategories: Category[] = [],
): CategoryPathResult | null => {
  for (const category of categories) {
    const normalizedName = category.slug
    const hasSubcategories = category.subCategories?.length > 0
    const newPath: NavigationItem[] = [
      ...path,
      {
        categories,
        currentCategory: category,
      },
    ]

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

export const findCategorySubcategories = (
  categories: Category[],
  target: string,
): Category[] | null => {
  for (const category of categories) {
    const normalizedName = category.slug

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

export const findCategoryByNormalizedName = (
  categories: Category[],
  target: string,
): Category | null => {
  for (const category of categories) {
    const normalized = category.slug
    if (normalized === target) return category

    if (category.subCategories?.length) {
      const found = findCategoryByNormalizedName(category.subCategories, target)
      if (found) return found
    }
  }
  return null
}

enum FilterType {
  Input,
  Range,
  Selection,
  MultiSelection,
}

export const filterMap = {
  height: {
    type: FilterType.Range,
    label: 'Wysokość',
  },
  width: {
    type: FilterType.Range,
    label: 'Szerokość',
  },
  depth: {
    type: FilterType.Range,
    label: 'Głębokość',
  },
  weigth: {
    type: FilterType.Range,
    label: 'Waga',
  },
  color: {
    type: FilterType.MultiSelection,
    lable: 'Kolor',
  },
  material: {
    type: FilterType.MultiSelection,
    lable: 'Materiał',
  },
  resistance: {
    type: FilterType.MultiSelection,
    label: 'Odporność Na Warunki',
  },
  bio: {
    type: FilterType.Selection,
    label: 'Bio',
  },
  price: {
    type: FilterType.Selection,
    label: 'Cena',
  },
}
