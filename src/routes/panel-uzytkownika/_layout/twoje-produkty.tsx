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
import { findCategoryByNormalizedName } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import productCategoryList from '@/assets/data/productCategories.json'
import type { Item } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'
import { Edit, Plus, TrashIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const Route = createFileRoute(
  '/panel-uzytkownika/_layout/twoje-produkty',
)({
  component: TwojeProdukty,
})

export default function TwojeProdukty() {
  const { products, setProducts, removeProduct, userData } = useStore()

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [currentProduct, setCurrentProduct] = useState<Item | null>(null)
  const [editedProduct, setEditedProduct] = useState<Item | null>(null)

  const [yourProducts, setYourProducts] = useState<Item[]>([])

  useEffect(() => {
    setYourProducts(
      products.filter((product) => product.companyId === userData.id),
    )
  }, [products, userData.id])

  const handleEditProduct = (product: Item): void => {
    setCurrentProduct(product)
    setEditedProduct({ ...product })
    setIsDialogOpen(true)
  }
  const handleRemoveProduct = (product: Item): void => {
    removeProduct(product.id)
  }

  const handleAddProduct = (): void => {
    const newProduct: Item = {
      id: uuidv4(),
      name: '',
      price: 0,
      originalPrice: 0,
      available: true,
      description: '',
      images: ['/placeholder.svg'],
      categoryId: '',
      sku: '',
      companyId: userData.id,
      manufacturer: '',
      attributes: {},
    }
    setCurrentProduct(null)
    setEditedProduct(newProduct)
    setIsDialogOpen(true)
  }

  const handleSaveProduct = (): void => {
    if (!editedProduct) return

    if (currentProduct) {
      // Edit existing product
      setProducts([
        ...products,
        ...yourProducts.map((p) =>
          p.id === currentProduct.id ? editedProduct : p,
        ),
      ])
    } else {
      // Add new product
      setProducts([...products, editedProduct])
    }

    setIsDialogOpen(false)
  }

  const handleInputChange = <K extends keyof Item>(
    field: K,
    value: Item[K],
  ): void => {
    if (!editedProduct) return

    setEditedProduct({
      ...editedProduct,
      [field]: value,
    })
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
                    findCategoryByNormalizedName(
                      productCategoryList,
                      product.categoryId,
                    )?.name
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

          {editedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 md:col-span-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nazwa produktu</Label>
                  <Input
                    id="name"
                    value={editedProduct.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('name', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Opis produktu</Label>
                  <textarea
                    id="description"
                    rows={3}
                    value={editedProduct.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleInputChange('description', e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Cena (zł)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editedProduct.price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(
                        'price',
                        Number.parseFloat(e.target.value),
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategoria</Label>
                  <Input
                    id="category"
                    value={editedProduct.categoryId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('categoryId', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={editedProduct.sku}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('sku', e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">URL obrazka</Label>
                  <Input
                    id="image"
                    value={editedProduct.images?.[0]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('images', [e.target.value])
                    }
                  />
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Switch
                    id="available"
                    checked={editedProduct.available}
                    onCheckedChange={(checked: boolean) =>
                      handleInputChange('available', checked)
                    }
                  />
                  <Label htmlFor="available">Produkt dostępny</Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleSaveProduct}>
              {currentProduct ? 'Zapisz zmiany' : 'Dodaj produkt'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
