import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ChevronRight, Heart, ShoppingCart } from 'lucide-react'
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
import type { Category, Product } from '@/types/types'
import { SellerModal } from '@/components/SellerModal'
import { Badge } from '@/components/ui/badge'
import categoryList from '@/assets/data/productCategories.json'
import productCategoryList from '@/assets/data/productCategories.json'
import { findCategoryPath } from '@/lib/utils'

export const Route = createFileRoute('/produkt/$produktId')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = useParams({ from: '/produkt/$produktId' })
  const { products, companies } = useStore(
    useShallow((state) => ({
      products: state.products,
      companies: state.companies,
    })),
  )
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    undefined,
  )
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])

  useEffect(() => {
    setSimilarProducts(
      products.filter(
        (product) => product.categoryId === currentProduct?.categoryId,
      ),
    )
  }, [currentProduct])

  useEffect(() => {
    setCurrentProduct(products.find((product) => product.id === data.produktId))
  }, [setCurrentProduct, data.produktId])

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
      categoryList,
      parseInt(currentProduct.categoryId),
    )
    const categoryPath = findCategoryPath(
      productCategoryList,
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
                to={`/kategoria/$categoryId`}
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
                src={currentProduct.images?.[0] || '/images/placeholder.jpg'}
                alt={currentProduct.name}
                className="object-cover  w-full"
              />
            </div>
            <div className="flex space-x-2 overflow-auto p-2">
              {Array.isArray(currentProduct.images) &&
                currentProduct.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
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
                  By
                  <Button
                    variant="link"
                    onClick={() => setIsDialogOpen(true)}
                    className="text-primary"
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
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="grid w-full grid-cols-3 rounded-lg">
                <TabsTrigger value="description" className="rounded-lg">
                  Description
                </TabsTrigger>
                <TabsTrigger value="features" className="rounded-lg">
                  Features
                </TabsTrigger>
                <TabsTrigger value="specifications" className="rounded-lg">
                  Specifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card className="border-0 shadow-none">
                  <CardContent className="pt-4">
                    <p>{currentProduct.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* <TabsContent value="features" className="mt-4">
              <Card className="border-0 shadow-none">
                <CardContent className="pt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {currentProduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <Card className="border-0 shadow-none">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    {currentProduct.specifications.map((spec, index) => (
                      <div key={index} className="grid grid-cols-2">
                        <span className="font-medium">{spec.name}</span>
                        <span>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
            </Tabs>
          </div>
        </div>

        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6">Podobne produkty</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {similarProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/3 lg:basis-1/4"
                >
                  <Card className="h-full">
                    <CardContent className="p-4 flex flex-col h-full">
                      <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
                        <img
                          src={product.images?.[0] || '/images/placeholder.jpg'}
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
                        className="mt-auto rounded-full"
                      >
                        View Product
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
      </div>

      <SellerModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        companyId={currentProduct.companyId}
      />
    </>
  )
}
