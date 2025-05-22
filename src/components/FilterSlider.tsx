import { Slider } from '@/components/Slider'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'

export const FilterSlider = ({
  label,
  fieldName,
}: {
  label: string
  fieldName: string
}) => {
  const form = useFormContext()
  return (
    <FormItem>
      <FormLabel className="text-lg text-black/80 font-semibold mb-2">
        {label}
      </FormLabel>
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => {
          return (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 text-gray-700">
              <FormControl>
                <Slider
                  value={field.value}
                  min={0}
                  max={100}
                  setExternalValue={(val) => field.onChange(val)}
                  range
                />
              </FormControl>
            </FormItem>
          )
        }}
      />
    </FormItem>
  )
}
