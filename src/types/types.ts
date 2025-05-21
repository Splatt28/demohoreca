export type Product = {
  id: string
  name: string
  price: number
  originalPrice: number
  available: boolean
  description: string
  images: string[] | null
  categoryId: string
  sku: string
  companyId: string
  manufacturer: string
  attributes: Record<string, string | number | boolean | undefined>
}

export type CompanyData = {
  id: string
  companyLogo: string
  firstName: string
  lastName: string
  companyName: string
  address: string
  email: string
  description: string
  website: string
  socialMedia: string
  phone: string
}

export type ListType = 'PRODUCT' | 'SERVICE'

export type Category = {
  id: number | string
  name: string
  subCategories: Category[]
  slug: string
}

export type NavigationItem = {
  categories: Category[]
  currentCategory: Category
}

export type SlideDirection = '' | 'slide-left' | 'slide-right'

export type CategorySidebarProps = {
  onCategorySelect?: (category: Category) => void
  type: ListType
}
export type CategoryPathResult = {
  navigationStack: NavigationItem[]
  currentCategories: Category[]
}
