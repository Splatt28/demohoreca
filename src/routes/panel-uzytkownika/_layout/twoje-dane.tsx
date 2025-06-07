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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Pencil, Save, X } from 'lucide-react'
import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@/store/useStore'
import { SellerModal } from '@/components/SellerModal'

export const Route = createFileRoute('/panel-uzytkownika/_layout/twoje-dane')({
  component: TwojeDane,
})

export default function TwojeDane() {
  const { userData, setUserData, companies, setCompanies } = useStore()
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleEdit = (field: string): void => {
    setEditingField(`${field}`)
    setEditValue((userData as any)[field])
  }

  const handleSave = (field: string): void => {
    setUserData({
      ...userData,
      [field]: editValue,
    })
    const changedCompanyIndex = companies.findIndex(
      (company) => company.id === userData.id,
    )
    const tempComapnies = companies
    tempComapnies[changedCompanyIndex] = {
      ...tempComapnies[changedCompanyIndex],
      [field]: editValue,
    }
    setCompanies(tempComapnies)
    setEditingField(null)
  }

  const handleCancel = (): void => {
    setEditingField(null)
  }

  const renderField = (field: string, label: string): JSX.Element => {
    const isEditing = editingField === `${field}`
    const value = (userData as any)[field]

    return (
      <div className="flex items-center justify-between py-3 border-b">
        <Label className="font-medium">{label}</Label>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Input
                value={editValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditValue(e.target.value)
                }
                className="w-64"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleSave(field)}
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <span className="text-muted-foreground">{value}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleEdit(field)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-4">
        <h1 className="text-3xl font-bold mb-6">Twoje dane</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          Pokaż stronę sprzedawcy
        </Button>
      </div>
      <p className="text-muted-foreground mb-8">
        Zarządzaj swoimi danymi osobowymi i publicznymi. Kliknij ikonę edycji,
        aby zmienić dane.
      </p>

      <Tabs defaultValue="personal" className="w-full">
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Twoje dane</CardTitle>
              <CardDescription>
                Tu znajdziesz wszystkie informacje o swojej firmie
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderField('firstName', 'Imię')}
              {renderField('lastName', 'Nazwisko')}
              {renderField('email', 'Email')}
              {renderField('phone', 'Telefon')}
              {renderField('address', 'Adres')}
              {renderField('companyName', 'Nazwa firmy')}
              {renderField('description', 'Opis')}
              {renderField('website', 'Strona internetowa')}
              {renderField('socialMedia', 'Media społecznościowe')}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {isDialogOpen && (
        <SellerModal
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          companyId="1"
        />
      )}
    </div>
  )
}
