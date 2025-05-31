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

export const Radio = ({
  listLabel,
  fieldName,
}: {
  listLabel: string
  fieldName: string
}) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={() => (
        <FormItem>
          <FormLabel className="text-lg text-black/80 font-semibold mb-2 capitalize">
            {listLabel}
          </FormLabel>
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            defaultValue={false}
            render={({ field }) => {
              return (
                <FormItem
                  key={fieldName}
                  className="flex flex-row items-start space-x-3 space-y-0 text-gray-700"
                >
                  <FormControl>
                    <Checkbox
                      className="rounded-full"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal capitalize">
                    {listLabel}
                  </FormLabel>
                </FormItem>
              )
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
