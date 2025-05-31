import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, Globe, Instagram, Phone, Mail } from 'lucide-react'
import { useStore } from '@/store/useStore'
import type { CompanyData } from '@/types/types'
import { useEffect, useState } from 'react'

export const SellerModal = ({
  isDialogOpen,
  setIsDialogOpen,
  companyId,
}: {
  isDialogOpen: boolean
  setIsDialogOpen: (isOpen: boolean) => void

  companyId: string
}) => {
  const { companies } = useStore()

  const [currentCompany, setCurrentyCompany] = useState<CompanyData>()

  useEffect(() => {
    const tempCompany = companies.find((company) => company.id === companyId)
    setCurrentyCompany(tempCompany)
  }, [companyId, companies])

  if (!currentCompany) {
    return <></>
  }

  return (
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
                src={'/placeholder.svg'}
                alt={currentCompany.companyName}
              />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                {currentCompany.companyName}
              </h2>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="h-3 w-3" />
                <span>{currentCompany.address}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">O sprzedawcy</h3>
            <p>{currentCompany.description}</p>
            <p className="text-sm text-muted-foreground">
              Na platformie od: 05 Maja 2025
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontakt</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`https://${currentCompany.website}`}
                  className="text-primary hover:underline"
                >
                  {currentCompany.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`https://${currentCompany.socialMedia}`}
                  className="text-primary hover:underline"
                >
                  {currentCompany.socialMedia}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{currentCompany.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{currentCompany.email}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
