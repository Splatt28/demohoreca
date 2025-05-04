'use client'

import { useState, type JSX } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Globe, Instagram, Phone, Mail } from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'
import { CategoryEnum } from '@/types/enums'

export const Route = createFileRoute(
  '/panel-uzytkownika/_layout/twoja-strona-sprzedawcy',
)({
  component: TwojaStronaSprzedawcy,
})

interface SellerContact {
  phone: string
  email: string
}

interface SellerData {
  name: string
  logo: string
  rating: number
  reviewCount: number
  description: string
  location: string
  website: string
  social: string
  contact: SellerContact
  categories: string[]
  joinDate: string
}

export default function TwojaStronaSprzedawcy(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const sellerData: SellerData = {
    name: 'Sklep Jana',
    logo: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 124,
    description:
      'Najlepsze produkty w najlepszych cenach. Specjalizujemy się w elektronice i akcesoriach od 2015 roku.',
    location: 'Warszawa, Polska',
    website: 'www.sklepjana.pl',
    social: 'instagram.com/sklepjana',
    contact: {
      phone: '+48 123 456 789',
      email: 'kontakt@sklepjana.pl',
    },
    categories: [CategoryEnum.artykuly_spozywcze, CategoryEnum.obiekt],
    joinDate: 'Maj 2015',
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Twoja strona sprzedawcy</h1>
      <p className="text-muted-foreground mb-8">
        Tak wygląda Twoja publiczna strona sprzedawcy widoczna dla klientów.
      </p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Podgląd strony sprzedawcy</CardTitle>
          <CardDescription>
            Kliknij przycisk poniżej, aby zobaczyć, jak wygląda Twoja strona
            sprzedawcy dla klientów.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <Button onClick={() => setIsDialogOpen(true)}>
            Pokaż stronę sprzedawcy
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Strona sprzedawcy</DialogTitle>
            <DialogDescription>
              Tak wygląda Twoja strona sprzedawcy dla klientów.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={sellerData.logo || '/placeholder.svg'}
                  alt={sellerData.name}
                />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{sellerData.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">
                      {sellerData.rating}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({sellerData.reviewCount} opinii)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="h-3 w-3" />
                  <span>{sellerData.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sellerData.categories.map((category) => (
                    <Badge key={category} variant="default">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">O sprzedawcy</h3>
              <p>{sellerData.description}</p>
              <p className="text-sm text-muted-foreground">
                Na platformie od: {sellerData.joinDate}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Kontakt</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://${sellerData.website}`}
                    className="text-primary hover:underline"
                  >
                    {sellerData.website}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://${sellerData.social}`}
                    className="text-primary hover:underline"
                  >
                    {sellerData.social}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{sellerData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{sellerData.contact.email}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
