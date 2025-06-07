import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { filterMap } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import serviceCategoryList from '@/assets/data/serviceCategories.json'
import type { Category, Item } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'
import { Edit, Plus, TrashIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ComboboxForm } from '@/components/Combobox'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { Form } from '@/components/ui/form'

export const Route = createFileRoute('/panel-uzytkownika/_layout/twoje-uslugi')(
  {
    component: TwojeUslugi,
  },
)

type AttributeField = {
  key: string
  value: string
}

type FormValues = {
  id?: string
  name: string
  price: number
  originalPrice: number
  available: boolean
  description: string
  images: string[]
  categoryId: string
  sku: string
  manufacturer: string
  attributes: AttributeField[]
}

export default function TwojeUslugi() {
  const { services, setServices, removeProduct, userData } = useStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Item | null>(null)
  const [yourProducts, setYourProducts] = useState<Item[]>([])

  useEffect(() => {
    setYourProducts(
      services.filter((service) => service.companyId === userData.id),
    )
  }, [services, userData.id])

  // react-hook-form setup
  const form = useForm<FormValues>({
    defaultValues: {
      id: undefined,
      name: '',
      price: 0,
      originalPrice: 0,
      available: true,
      description: '',
      images: [''],
      categoryId: '',
      sku: '',
      manufacturer: '',
      attributes: [],
    },
  })
  const {
    control,
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = form

  const {
    fields: attributeFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'attributes',
  })

  // open dialog with new product form
  const handleAddProduct = () => {
    setCurrentProduct(null)
    reset({
      id: undefined,
      name: '',
      price: 0,
      originalPrice: 0,
      available: true,
      description: '',
      images: [''],
      categoryId: '',
      sku: '',
      manufacturer: '',
      attributes: [],
    })
    setIsDialogOpen(true)
  }

  // open dialog and fill with existing product data
  const handleEditProduct = (product: Item) => {
    setCurrentProduct(product)
    // convert attributes object to array for form
    const attrs: AttributeField[] = Object.entries(
      product.attributes || {},
    ).map(([key, value]) => ({
      key,
      value: String(value),
    }))
    reset({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      available: product.available,
      description: product.description,
      images: product?.images?.length ? product.images : [''],
      categoryId: product.categoryId,
      sku: product.sku,
      manufacturer: product.manufacturer,
      attributes: attrs,
    })
    setIsDialogOpen(true)
  }

  // remove product
  const handleRemoveProduct = (product: Item) => {
    removeProduct(product.id)
  }

  // on form submit - save or update product
  const onSubmit = () => {
    const data = getValues()
    // Convert attributes array back to object
    const attributesObj: {
      [key: string]: string | number | boolean | string[]
    } = {}
    data.attributes.forEach(({ key, value }) => {
      if (key.trim() !== '') {
        // try to convert to number or boolean if possible
        let val: string | number | boolean = value.trim()

        if (val.toLowerCase() === 'true') val = true
        else if (val.toLowerCase() === 'false') val = false
        else if (!isNaN(Number(val))) val = Number(val)

        attributesObj[key] = val
      }
    })

    const newService: Item = {
      id: data.id ?? uuidv4(),
      name: data.name,
      price: data.price,
      originalPrice: data.originalPrice,
      available: data.available,
      description: data.description,
      images: data.images.filter(Boolean), // remove empty strings
      categoryId: data.categoryId,
      sku: data.sku,
      companyId: userData.id,
      manufacturer: data.manufacturer,
      attributes: attributesObj,
    }
    if (currentProduct) {
      // Update existing product
      setServices(
        services.map((p) => (p.id === currentProduct.id ? newService : p)),
      )
    } else {
      // Add new product
      setServices([...services, newService])
    }

    setIsDialogOpen(false)
    return
  }

  const categoryValues = (): { value: string | number; label: string }[] => {
    const result: { value: string | number; label: string }[] = []

    function traverse(cat: Category) {
      result.push({ value: cat.id, label: cat.name })
      cat.subCategories?.forEach(traverse)
    }

    serviceCategoryList.forEach(traverse)

    return result
  }

  const attributeValues = (): { value: string | number; label: string }[] => {
    return Object.entries(filterMap).map(([key, value]) => ({
      value: key,
      label: value.label,
    }))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Twoje produkty</h1>
        <Button onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Dodaj produkt
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nazwa</TableHead>
              <TableHead>Cena</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Kategoria</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {yourProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.price.toFixed(2)} zł</TableCell>
                <TableCell>
                  <Badge variant={product.available ? 'default' : 'secondary'}>
                    {product.available ? 'Dostępny' : 'Niedostępny'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {
                    categoryValues().find(
                      (cat) => String(cat.value) === product.categoryId,
                    )?.label
                  }
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveProduct(product)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentProduct ? 'Edytuj produkt' : 'Dodaj nowy produkt'}
            </DialogTitle>
            <DialogDescription>
              Wypełnij wszystkie pola, aby{' '}
              {currentProduct ? 'zaktualizować' : 'dodać'} produkt.
            </DialogDescription>
          </DialogHeader>
          <Form {...form} handleSubmit={handleSubmit(onSubmit) as any}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 md:col-span-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nazwa produktu</Label>
                  <Input
                    id="name"
                    {...register('name', { required: 'Nazwa jest wymagana' })}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Opis produktu</Label>
                  <textarea
                    id="description"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    {...register('description')}
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Cena (zł)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register('price', {
                      required: 'Cena jest wymagana',
                      valueAsNumber: true,
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-600 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Cena oryginalna (zł)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    {...register('originalPrice', {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryId">Kategoria</Label>
                  <ComboboxForm
                    options={categoryValues()}
                    valueName={'category'}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="images.0">URL obrazka</Label>
                  <Input
                    id="images.0"
                    {...register('images.0')}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Producent</Label>
                  <Input id="manufacturer" {...register('manufacturer')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" {...register('sku')} />
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Controller
                    control={control}
                    name="available"
                    render={({ field }) => (
                      <Switch
                        id="available"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="available">Produkt dostępny</Label>
                </div>
              </div>
            </div>

            {/* Dynamic attributes */}
            <div>
              <Label className="mb-2 block font-semibold text-base">
                Atrybuty produktu
              </Label>

              {attributeFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center mb-2">
                  <ComboboxForm
                    options={attributeValues()}
                    valueName={`attributes.${index}.key`}
                  />
                  <Input
                    placeholder="Wartość atrybutu"
                    {...register(`attributes.${index}.value` as const, {
                      required: 'Wartość atrybutu jest wymagana',
                    })}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    size="icon"
                  >
                    &times;
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                onClick={() => append({ key: '', value: '' })}
                className="mt-2"
              >
                Dodaj atrybut
              </Button>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Anuluj
              </Button>
              <Button type="submit" onClick={onSubmit}>
                {currentProduct ? 'Zapisz zmiany' : 'Dodaj usługę'}
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
