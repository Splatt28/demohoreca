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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Pencil, Save, X } from 'lucide-react'
import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@/store/useStore'
import type { UserData } from '@/types/types'

export const Route = createFileRoute('/panel-uzytkownika/_layout/twoje-dane')({
  component: TwojeDane,
})

export default function TwojeDane() {
  const { userData, setUserData } = useStore()
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>('')

  const handleEdit = (section: keyof UserData, field: string): void => {
    setEditingField(`${section}.${field}`)
    setEditValue((userData as any)[section as any][field])
  }

  const handleSave = (section: keyof UserData, field: string): void => {
    setUserData({
      ...userData,
      [section]: {
        ...userData[section],
        [field]: editValue,
      },
    })
    setEditingField(null)
  }

  const handleCancel = (): void => {
    setEditingField(null)
  }

  const renderField = (
    section: keyof UserData,
    field: string,
    label: string,
  ): JSX.Element => {
    const isEditing = editingField === `${section}.${field}`
    const value = (userData as any)[section as any][field]

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
                onClick={() => handleSave(section, field)}
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
                onClick={() => handleEdit(section, field)}
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
      <h1 className="text-3xl font-bold mb-6">Twoje dane</h1>
      <p className="text-muted-foreground mb-8">
        Zarządzaj swoimi danymi osobowymi i publicznymi. Kliknij ikonę edycji,
        aby zmienić dane.
      </p>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="personal">Dane osobowe</TabsTrigger>
          <TabsTrigger value="public">Dane publiczne</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Dane osobowe</CardTitle>
              <CardDescription>
                Te informacje są używane do kontaktu z Tobą i nie są widoczne
                publicznie.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderField('personalData', 'firstName', 'Imię')}
              {renderField('personalData', 'lastName', 'Nazwisko')}
              {renderField('personalData', 'email', 'Email')}
              {renderField('personalData', 'phone', 'Telefon')}
              {renderField('personalData', 'address', 'Adres')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="public">
          <Card>
            <CardHeader>
              <CardTitle>Dane publiczne</CardTitle>
              <CardDescription>
                Te informacje są widoczne dla klientów na Twojej stronie
                sprzedawcy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderField('publicData', 'companyName', 'Nazwa firmy')}
              {renderField('publicData', 'description', 'Opis')}
              {renderField('publicData', 'website', 'Strona internetowa')}
              {renderField(
                'publicData',
                'socialMedia',
                'Media społecznościowe',
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
