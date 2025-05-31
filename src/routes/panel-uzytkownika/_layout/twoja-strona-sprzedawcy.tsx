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
import { createFileRoute } from '@tanstack/react-router'
import { SellerModal } from '@/components/SellerModal'

export const Route = createFileRoute(
  '/panel-uzytkownika/_layout/twoja-strona-sprzedawcy',
)({
  component: TwojaStronaSprzedawcy,
})

export default function TwojaStronaSprzedawcy(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

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
      <SellerModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        companyId="1"
      />
    </div>
  )
}
