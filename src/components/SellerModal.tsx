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
import { useStore } from '@/store/useStore'

export const SellerModal = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean
  setIsDialogOpen: (isOpen: boolean) => void
}) => {
  const {
    userData: { publicData, personalData },
  } = useStore()
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
                alt={publicData.companyName}
              />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{publicData.companyName}</h2>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="h-3 w-3" />
                <span>{personalData.address}</span>
              </div>
              {/* <div className="flex flex-wrap gap-2 mt-2">
                {personalData.categories.map((category) => (
                  <Badge key={category} variant="default">
                    {category}
                  </Badge>
                ))}
              </div> */}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">O sprzedawcy</h3>
            <p>{publicData.description}</p>
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
                  href={`https://${publicData.website}`}
                  className="text-primary hover:underline"
                >
                  {publicData.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`https://${publicData.socialMedia}`}
                  className="text-primary hover:underline"
                >
                  {publicData.socialMedia}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{personalData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{personalData.email}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
