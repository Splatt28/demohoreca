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
}

interface PersonalData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
}

interface PublicData {
  companyName: string
  description: string
  website: string
  socialMedia: string
}

export interface UserData {
  personalData: PersonalData
  publicData: PublicData
}
