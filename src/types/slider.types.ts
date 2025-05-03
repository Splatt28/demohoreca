import { Root } from '@radix-ui/react-slider'
import type { ComponentPropsWithoutRef } from 'react'

export interface RangeSliderProps
  extends ComponentPropsWithoutRef<typeof Root> {
  min: number
  max: number
  setExternalValue: (year: number[]) => void
  range?: boolean
  showTooltip?: boolean
  showInput?: boolean
  displaySteps?: boolean
  customSteps?: number[]
  disabledSteps?: number[]
}
