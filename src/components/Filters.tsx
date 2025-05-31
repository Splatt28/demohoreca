import { CategoriesList } from '@/components/CategoriesList'
import { CheckboxList } from '@/components/CheckboxList'
import { FilterSlider } from '@/components/FilterSlider'
import { Radio } from '@/components/Radio'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useProducts } from '@/hooks/use-products'
import { filterMap, FilterType } from '@/lib/utils'
import type { ListType } from '@/types/types'
import { useMatch, useParams } from '@tanstack/react-router'

export const Filters = ({ type, categoryId }: { type: ListType, categoryId?: string }) => {
    const isProduct = type === "PRODUCT";

    const isCategoryRoute = useMatch({
        from: isProduct ? "/kategoria/$categoryId" : "/uslugi/$categoryId"
    }) !== null;

    const data = useParams({
        from: isProduct ? "/kategoria/$categoryId" : "/uslugi/$categoryId"
    });

    const { getItemsByCategory, getAllItems, getFiltersFromProducts } = useProducts()

    const items = isCategoryRoute && data.categoryId
        ? getItemsByCategory(data.categoryId, type)
        : getAllItems(type);

    const filtersList = getFiltersFromProducts(items)
        .map((filter) => ({
            value: filter,
            ...filterMap[filter as keyof typeof filterMap],
        }))
        .filter(Boolean)

    const getUniqueAttributeValues = (attributeName: string) => {
        const rawValues = items.flatMap(
            (product): (string | number | boolean)[] => {
                const value = product.attributes[attributeName]
                if (typeof value === 'string') {
                    return value
                        .split(',')
                        .map((v) => v.trim().toLowerCase())
                        .filter((v) => v.length > 0)
                }
                if (value !== undefined) {
                    return Array.isArray(value) ? value : [value]
                }
                return []
            }
        )
        const uniqueValues = Array.from(new Set(rawValues))
        return uniqueValues.map((val) => ({ label: val, id: val }))
    }

    const getRangeValues = (attributeName: string) => {
        const rawValues = items.flatMap(
            (product): (string | number | boolean)[] => {
                const value = product.attributes[attributeName]
                if (typeof value === 'string') {
                    return value
                        .split(',')
                        .map((v) => v.trim().toLowerCase())
                        .filter((v) => v.length > 0)
                }
                if (value !== undefined) {
                    return Array.isArray(value) ? value : [value]
                }
                return []
            }
        )
        return [
            Math.min(...(rawValues as number[])),
            Math.max(...(rawValues as number[])),
        ]
    }

    const getFilterComponent = (
        type: string,
        filterType: FilterType,
        label: string,
    ) => {
        switch (filterType) {
            case FilterType.Input:
                return <Input />
            case FilterType.MultiSelection:
                return (
                    <CheckboxList
                        listLabel={label}
                        items={getUniqueAttributeValues(type) as any}
                        fieldName={type}
                        key={type}
                    />
                )
            case FilterType.Selection:
                return <Radio key={type} listLabel={type} fieldName={type} />

            case FilterType.Range:
                const range = getRangeValues(type)
                if (range.length < 2 || range[0] === range[1]) {
                    return
                }
                return (
                    <FilterSlider
                        key={type}
                        label={label}
                        fieldName={type}
                        min={range[0]}
                        max={range[1]}
                    />
                )
        }
    }

    return (
        <div className="flex gap-6 flex-col">
            <CategoriesList type={type} categoryId={categoryId} />
            {filtersList.map((filter) =>
                getFilterComponent(filter.value, filter.type, filter.label),
            )}
        </div>
    )
}
