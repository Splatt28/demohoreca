'use client'
import { useFormContext } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type ItemType = {
  id: string
  label: string
  labelDescription?: string
}[]

export const CheckboxList = <T,>({
  listLabel,
  items,
}: {
  listLabel: string
  items: T & ItemType
}) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name="items"
      render={() => (
        <FormItem>
          <FormLabel className="text-lg text-black/80 font-semibold mb-2">
            {listLabel}
          </FormLabel>
          {items.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="items"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0 text-gray-700"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.id,
                                ),
                              )
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal capitalize">
                      {item.label} <span>{item.labelDescription}</span>
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
