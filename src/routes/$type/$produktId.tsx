import {
  createFileRoute,
  Link,
  useParams,
  useRouter,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ChevronRight, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store/useStore'
import { useShallow } from 'zustand/react/shallow'
import type { Category, Item } from '@/types/types'
import { SellerModal } from '@/components/SellerModal'
import { Badge } from '@/components/ui/badge'
import serviceCategoryList from '@/assets/data/serviceCategories.json'
import productCategoryList from '@/assets/data/productCategories.json'
import { filterMap, findCategoryPath } from '@/lib/utils'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export const Route = createFileRoute('/$type/$produktId')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const data = useParams({ from: '/$type/$produktId' })
  const { products, services, companies } = useStore(
    useShallow((state) => ({
      products: state.products,
      services: state.services,
      companies: state.companies,
    })),
  )
  const typeItems = data.type === 'produkt' ? products : services
  const categoryItems =
    data.type === 'produkt' ? productCategoryList : serviceCategoryList
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [currentProduct, setCurrentProduct] = useState<Item | undefined>(
    undefined,
  )
  const [similarProducts, setSimilarProducts] = useState<Item[]>([])

  useEffect(() => {
    setSimilarProducts(
      typeItems.filter(
        (product) =>
          product.categoryId === currentProduct?.categoryId &&
          product.id !== currentProduct.id,
      ),
    )
  }, [currentProduct, typeItems])

  useEffect(() => {
    setCurrentProduct(
      typeItems.find((product) => product.id === data.produktId),
    )
  }, [setCurrentProduct, data.produktId, typeItems])

  const [selectedImage, setSelectedImage] = useState(0)

  if (!currentProduct) {
    return <>Loading...</>
  }
  const getCompanyName = (companyId: string) => {
    return (
      companies.find((company) => company.id === companyId)?.companyName || ''
    )
  }

  function findById(data: Category[], id: number): Category | undefined {
    for (const cat of data) {
      if (cat.id === id) {
        return cat
      }
      const found = findById(cat.subCategories, id)
      if (found) {
        return found
      }
    }
    return undefined
  }
  const getBreadcrumbs = () => {
    const productCategory = findById(
      categoryItems,
      parseInt(currentProduct.categoryId),
    )
    const categoryPath = findCategoryPath(
      categoryItems,
      productCategory?.slug || '',
    )
    if (!categoryPath?.navigationStack) {
      return null
    }
    return categoryPath.navigationStack.map((stack) => {
      return (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to={
                  data.type === 'produkt'
                    ? `/kategoria/$categoryId`
                    : '/uslugi/$categoryId'
                }
                params={{
                  categoryId: stack.currentCategory.slug,
                }}
              >
                {stack.currentCategory.name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
        </>
      )
    })
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            {getBreadcrumbs()}
            <BreadcrumbItem>
              <BreadcrumbPage>{currentProduct.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border">
              <img
                src={
                  `${router.basepath}${currentProduct.images?.[selectedImage]}` ||
                  '/images/placeholder.jpg'
                }
                alt={currentProduct.name}
                className="object-cover  w-full"
              />
            </div>
            <div className="flex space-x-2 overflow-auto p-2">
              {Array.isArray(currentProduct.images) &&
                currentProduct.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border cursor-pointer ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={`${router.basepath}${image}`}
                      alt={`${currentProduct.name} view ${index + 1}`}
                      className="object-cover w-full"
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{currentProduct.name}</h1>
              <div className="flex items-center mt-2">
                <p className="text-muted-foreground">
                  <Button
                    variant="link"
                    onClick={() => setIsDialogOpen(true)}
                    className="text-primary px-0"
                  >
                    {getCompanyName(currentProduct.companyId)}
                  </Button>
                </p>
              </div>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold">
                {currentProduct.price.toFixed(2)}zł
              </span>
              {currentProduct.price !== currentProduct.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {currentProduct.originalPrice.toFixed(2)}zł
                </span>
              )}
              {currentProduct.price !== currentProduct.originalPrice && (
                <Badge className="rounded-full px-3 bg-green-100 text-green-800 hover:bg-green-100">
                  -
                  {Math.round(
                    ((currentProduct.originalPrice - currentProduct.price) /
                      currentProduct.originalPrice) *
                      100,
                  )}
                  %
                </Badge>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex space-x-3">
                <Button className="flex-1 rounded-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Kup teraz
                </Button>
              </div>
            </div>

            <Tabs defaultValue="description " className="mt-6">
              <TabsList className="grid w-full grid-cols-3 rounded-lg">
                <TabsTrigger
                  value="description"
                  className="rounded-lg cursor-pointer"
                >
                  Opis
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="rounded-lg cursor-pointer"
                >
                  Szczegóły
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="rounded-lg cursor-pointer"
                >
                  Specyfikacja
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card className="border-0 shadow-none">
                  <CardContent className="pt-4">
                    <p>{currentProduct.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <Card className="border-0 shadow-none">
                  <CardContent className="pt-4">
                    <Table>
                      <TableBody>
                        {Object.entries(currentProduct.attributes).map(
                          ([key, value]) => (
                            <TableRow key={key}>
                              <TableCell className="font-medium capitalize">
                                {filterMap[key as keyof typeof filterMap].label}
                              </TableCell>
                              <TableCell className="capitalize">
                                {Array.isArray(value)
                                  ? value.join(', ')
                                  : String(value)}
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <Card className="border-0 shadow-none">
                  <CardContent className="pt-4">
                    <Table>
                      <TableBody>
                        <TableRow key={currentProduct.sku}>
                          <TableCell className="font-medium capitalize">
                            SKU
                          </TableCell>
                          <TableCell>{currentProduct.sku}</TableCell>
                        </TableRow>
                        <TableRow key={currentProduct.manufacturer}>
                          <TableCell className="font-medium capitalize">
                            Producent
                          </TableCell>
                          <TableCell>{currentProduct.manufacturer}</TableCell>
                        </TableRow>
                        <TableRow key="available">
                          <TableCell className="font-medium capitalize">
                            Dostępność
                          </TableCell>
                          <TableCell>
                            {currentProduct.available ? 'Tak' : 'Nie'}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {!!similarProducts.length && (
          <div className="my-12">
            <h2 className="text-2xl font-bold mb-6">Podobne produkty</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {similarProducts.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <Card className="h-full py-0">
                      <CardContent className="p-4 flex flex-col h-full">
                        <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
                          <img
                            src={
                              `${router.basepath}${product.images?.[0]}` ||
                              '/images/placeholder.jpg'
                            }
                            alt={product.name}
                            className="object-cover w-full transition-transform hover:scale-105"
                          />
                        </div>
                        <h3 className="font-medium line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="font-bold mt-1">
                          {product.price.toFixed(2)}zł
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 rounded-full"
                        >
                          Sprawdź produkt
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        )}
      </div>

      <SellerModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        companyId={currentProduct.companyId}
      />
    </>
  )
}
