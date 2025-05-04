import { type JSX } from 'react'

export const CategoryBanner = ({
  imageSrc,
  children,
}: {
  imageSrc: string
  children: JSX.Element
}) => {
  return (
    <div className="flex w-full h-64 mb-12 bg-primary-foreground overflow-hidden shadow-lg rounded-r-xl">
      <div className="relative w-1/3 h-full">
        <img
          src={imageSrc}
          alt="Banner"
          className="w-full h-full object-cover mask-triangle"
        />
      </div>

      <div className="flex-1 pr-12 flex flex-col justify-center">
        {children}
      </div>
    </div>
  )
}
