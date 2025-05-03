import { type RangeSliderProps } from '@/types/slider.types'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const useSlider = ({
  defaultValue,
  range,
  min,
  max,
  customSteps,
  displaySteps,
  setExternalValue,
  disabledSteps,
}: Pick<
  RangeSliderProps,
  | 'defaultValue'
  | 'range'
  | 'min'
  | 'max'
  | 'customSteps'
  | 'displaySteps'
  | 'setExternalValue'
  | 'disabledSteps'
>) => {
  const [value, setValue] = useState<number[]>(
    defaultValue || (range ? [min, max] : [min]),
  )
  // Separate input state allows user to input any number without slider rerender
  const [inputValues, setInputValues] = useState<number[]>(value)

  const allSteps = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    [min, max],
  )

  const handleValueChange = useCallback(
    (val: number[]) => {
      const validated = val.map((v, index) => {
        if (disabledSteps?.includes(v)) {
          return value[index]
        }
        return v
      })

      setValue(validated)
      setExternalValue?.(validated)
    },
    [value, setExternalValue, disabledSteps],
  )

  useEffect(() => {
    const newValue = defaultValue || (range ? [min, max] : [min])
    setValue(newValue)
    setInputValues(newValue)
  }, [range, defaultValue, min, max])

  const isInRange = useCallback(
    (value: number) => {
      return value >= min && value <= max
    },
    [max, min],
  )

  useEffect(() => {
    setValue((prevState) => {
      if (range) {
        const low = isInRange(prevState[0]) ? prevState[0] : min
        const high = isInRange(prevState[1]) ? prevState[1] : min
        return [low, high]
      }
      return isInRange(prevState[0]) ? [prevState[0]] : [min]
    })
  }, [range, min, max, isInRange])

  //Always return all possible steps. This way we can use flex css only approach to place all markes.
  const getSteps: {
    display: boolean
    step: number
    disabled?: boolean
  }[] = useMemo(() => {
    if (customSteps?.length) {
      return allSteps.map((step) => ({
        display: customSteps.includes(step),
        disabled: disabledSteps?.includes(step),
        step: step,
      }))
    }
    if (displaySteps) {
      return allSteps.map((step) => ({
        display: true,
        disabled: disabledSteps?.includes(step),
        step: step,
      }))
    }
    return []
  }, [allSteps, customSteps, displaySteps, disabledSteps])

  const handleInputChange = useCallback(
    (index: number, newValue: string) => {
      const numValue = Number(newValue)
      if (!isNaN(numValue)) {
        const newValues = [...value]
        newValues[index] = Math.min(Math.max(numValue, min || 0), max || 100)
        setValue(newValues)
      }
    },
    [max, min, value],
  )

  return {
    value,
    inputValues,
    getSteps,
    handleValueChange,
    setInputValues,
    handleInputChange,
  }
}
