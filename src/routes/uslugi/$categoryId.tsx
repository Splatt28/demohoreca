import {Filters} from '@/components/Filters'
import {ProductList} from '@/components/ProductList'
import {Form} from '@/components/ui/form'
import {useProducts} from '@/hooks/use-products'
import {filterProducts, findCategoryByNormalizedName, isFilterActive} from '@/lib/utils'
import type {Item} from '@/types/types'
import {
    createFileRoute,
    useNavigate,
    useParams,
    useSearch,
} from '@tanstack/react-router'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import serviceCategoryList from '@/assets/data/serviceCategories.json'

export const Route = createFileRoute('/uslugi/$categoryId')({
    component: RouteComponent,
})

function RouteComponent() {
    const data = useParams({from: '/uslugi/$categoryId'});
    const navigate = useNavigate({from: Route.fullPath})
    const search = useSearch({
        from: Route.fullPath,
    })
    const {getItemsByCategory} = useProducts()
    const {watch, ...form} = useForm()
    const { categoryId } = useParams({ from: '/uslugi/$categoryId' });

    const [currentProducts, setCurrentProducts] = useState<Item[]>(
        getItemsByCategory(data.categoryId, 'SERVICE'),
    )

    const getProducts = (filters: { [x: string]: any }) => {
        const hasNonCategoryFilters = Object.entries(filters).some(
            ([key, value]) => {
                return key !== 'category' && isFilterActive(value)
            },
        )
        if (!hasNonCategoryFilters) {
            return setCurrentProducts(getItemsByCategory(data.categoryId, 'SERVICE'))
        }
        setCurrentProducts(filterProducts(currentProducts, filters))
    }

    useEffect(() => {
        Object.entries(search).forEach(([key, value]) => form.setValue(key, value))
        getProducts(search)
    }, [])

    useEffect(() => {
        const {unsubscribe} = watch((filters) => {
            getProducts(filters)
            const filteredSearch = Object.fromEntries(
                Object.entries(filters).filter(
                    ([key, value]) =>
                        key !== 'category' &&
                        !!value &&
                        Array.isArray(value) &&
                        value.length,
                ),
            )
            navigate({
                search: filteredSearch as any,
                replace: true,
                resetScroll: false,
            })
        })
        return () => unsubscribe()
    }, [watch])

    return (
        <section className="container">
            <div className="grid grid-flow-col grid-cols-[auto_1fr] gap-30">
                <Form watch={watch} {...form}>
                    <Filters type="SERVICE" categoryId={categoryId} />
                    <ProductList products={currentProducts} type="SERVICE" categoryId={categoryId} />
                </Form>
            </div>
        </section>
    )
}
