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

export const normalizePolishString = (str: string) => {
  return str
    .split('(')[0] // Remove everything after "("
    .trim() // Clean up trailing spaces
    .normalize('NFD') // Decompose characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/ł/g, 'l') // Fix for ł
    .replace(/Ł/g, 'L')
    .replace(/\//g, '') // Escape forward slashes
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .toLowerCase()
}

export const findCategoryPath = (
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

export const findCategorySubcategories = (
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

export const findCategoryByNormalizedName = (
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
