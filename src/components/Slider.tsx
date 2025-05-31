import { type RangeSliderProps } from '@/types/slider.types'
import { useSlider } from '@/hooks/use-slider'
import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { Dot } from 'lucide-react'
import { type ComponentRef, forwardRef } from 'react'

const Slider = forwardRef<
  ComponentRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(
  (
    {
      className,
      range = false,
      showTooltip = false,
      showInput = false,
      displaySteps = false,
      customSteps = [],
      ...props
    },
    ref,
  ) => {
    const {
      value,
      handleValueChange,
      getSteps,
      inputValues,
      setInputValues,
      handleInputChange,
    } = useSlider({
      min: props.min,
      max: props.max,
      customSteps,
      defaultValue: props.defaultValue,
      displaySteps,
      range,
      setExternalValue: props.setExternalValue,
      disabledSteps: props.disabledSteps,
    })

    return (
      <article className="relative pb-2 w-full z-10">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            'relative flex w-full touch-none select-none items-center',
            className,
          )}
          value={value}
          onValueChange={(val) => handleValueChange(val)}
          // onMouseUp={() => props.setExternalValue(value)}
          onValueCommit={(val) => props.setExternalValue(val)}
          max={props.max}
          min={props.min}
          defaultValue={props.defaultValue}
        >
          <SliderPrimitive.Track className="relative p-[0.3rem] h-2 w-full grow overflow-hidden rounded-full bg-orange-800 border border-white/10">
            <SliderPrimitive.Range
              className={cn('absolute h-full  top-0', range && 'bg-orange-300')}
            />
          </SliderPrimitive.Track>
          <div className="absolute w-full">
            <div className="flex justify-between m-[10px]">
              {getSteps.map(({ step, display, disabled }) => {
                const isSelected = value.includes(step)

                return (
                  <div
                    key={step}
                    className={cn(
                      'relative top-1/2 h-1 w-1 rounded-full',
                      display ? 'z-10' : 'opacity-0',
                      disabled ? 'opacity-30 cursor-not-allowed' : 'group',
                      isSelected && 'opacity-0',
                    )}
                  >
                    <Dot
                      size={10}
                      color="white"
                      className={cn(
                        'h-7 w-7 -top-3 -left-3 absolute rounded-full',
                        !disabled && 'hover:bg-white/10',
                      )}
                    />

                    {!disabled && (
                      <div className="absolute hidden bottom-full left-1/2 -translate-x-1/2 group-hover:block -translate-y-4 bg-orange-900 border p-2 rounded text-sm whitespace-nowrap tooltip">
                        <p className="w-8 text-white text-center">{step}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          {value.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              className="block group h-7 w-7 rounded-full bg-orange-300 ring-offset-background transition-colors cursor-grab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-orange-900 active:cursor-grabbing"
            >
              {showTooltip && (
                <div className="absolute transition-colors bottom-full left-1/2 -translate-x-1/2 -translate-y-3 bg-orange-300 px-2 py-1 rounded text-sm whitespace-nowrap tooltip group-active:bg-orange-900">
                  {showInput ? (
                    <input
                      value={inputValues[index]}
                      onPointerDown={(e) => e.stopPropagation()} // Prevents thumb drag when clicking input
                      onClick={(e) => e.stopPropagation()} // Prevents track click detection
                      onBlur={(e) => {
                        if (
                          props.disabledSteps?.includes(Number(e.target.value))
                        )
                          return
                        handleInputChange(index, e.target.value)
                      }} // Ensure that slider value is changed on blur
                      onChange={(e) =>
                        setInputValues((prevValues) => {
                          const newValue = Number(e.target.value)
                          const newArr = [...prevValues]
                          newArr[index] = newValue
                          return newArr
                        })
                      } // Allow user to freerly input any desired number - handleInputChange will validate if number is correct
                      className="w-8 text-white bg-transparent border-none text-center focus:outline-none"
                      min={props.min || 0}
                      max={props.max || 100}
                    />
                  ) : (
                    <p className="w-8 text-white bg-transparent border-none text-center focus:outline-none ">
                      {value[index]}
                    </p>
                  )}
                  <span className="absolute top-full transition-colors -translate-y-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-300 rotate-45 rounded-[3px] group-active:bg-orange-900"></span>
                </div>
              )}
            </SliderPrimitive.Thumb>
          ))}
        </SliderPrimitive.Root>
      </article>
    )
  },
)

export { Slider }
