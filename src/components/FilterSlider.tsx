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
  min,
  max,
}: {
  label: string
  fieldName: string
  min: number
  max: number
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 text-gray-700 mt-12">
              <FormControl>
                <Slider
                  value={field.value}
                  min={min}
                  max={max}
                  setExternalValue={(val) => {
                    if (val[0] === min && val[1] === max) {
                      return field.onChange(undefined)
                    }
                    field.onChange(val)
                  }}
                  range
                  showInput
                  showTooltip
                />
              </FormControl>
            </FormItem>
          )
        }}
      />
    </FormItem>
  )
}
