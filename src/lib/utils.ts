import type {
  Category,
  CategoryPathResult,
  NavigationItem,
  Item,
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

export enum FilterType {
  Input,
  Range,
  Selection,
  MultiSelection,
}

export const filterMap: Record<string, { type: FilterType; label: string }> = {
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
    label: 'Kolor',
  },
  material: {
    type: FilterType.MultiSelection,
    label: 'Materiał',
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
  power: {
    type: FilterType.Range,
    label: 'Moc',
  },
  wojewodztwa: {
    type: FilterType.MultiSelection,
    label: 'Województwa',
  },
}

export const isFilterActive = (value: any): boolean => {
  if (value === undefined || value === null) return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'string') return value.trim() !== ''
  return true
}

export const filterProducts = (
  products: Item[],
  filters: { [x: string]: any },
): Item[] => {
  return products.filter((product) => {
    for (const [filterKey, filterValue] of Object.entries(filters)) {
      if (
        filterValue === undefined ||
        filterKey === 'category' ||
        (Array.isArray(filterValue) && !filterValue?.length)
      ) {
        continue
      }
      const productValue = product.attributes[filterKey]
      if (typeof filterValue === 'boolean') {
        const hasProperty = productValue !== undefined && productValue !== null

        if (filterValue === true && !hasProperty) return false
        if (filterValue === false && hasProperty) return false
        continue
      }
      if (
        Array.isArray(filterValue) &&
        filterValue.length === 2 &&
        filterValue.every((val) => typeof val === 'number')
      ) {
        const [min, max] = filterValue
        const numericValue = Number(productValue)

        if (isNaN(numericValue) || numericValue < min || numericValue > max) {
          return false
        }
        continue
      }
      if (Array.isArray(filterValue)) {
        if (typeof productValue === 'string') {
          const matches = filterValue.some((val) =>
            productValue.toLocaleLowerCase().includes(val.toLocaleLowerCase()),
          )
          if (!matches) return false
        } else if (Array.isArray(productValue)) {
          const matches = filterValue.some((val) =>
            productValue.some((pVal) =>
              pVal.toLocaleLowerCase().includes(val.toLocaleLowerCase()),
            ),
          )
          if (!matches) return false
        } else {
          return false
        }
      } else {
        if (
          typeof productValue === 'string' &&
          !productValue
            .toLocaleLowerCase()
            .includes(String(filterValue).toLocaleLowerCase())
        ) {
          return false
        }
      }
    }

    return true
  })
}
