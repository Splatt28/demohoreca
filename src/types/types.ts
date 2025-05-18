export type Product = {
  id: string
  name: string
  price: number
  originalPrice: number
  available: boolean
  description: string
  images: string[]
  category: string
  sku: string
  companyId: string
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
