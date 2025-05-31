import { type JSX } from 'react'

export const CategoryBanner = ({
  imageSrc,
  children,
}: {
  imageSrc: string
  children: JSX.Element
}) => {
  return (
    <div className="mb-6">
      <div className="flex w-full h-64 mb-6 relative bg-primary-foreground/50 shadow-lg rounded-xl overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/60 after:to-transparent after:pointer-events-none">
        <img src={imageSrc} alt="Banner" className="w-full absolute bottom-0" />

        <div className="flex-1 pr-12 flex flex-col justify-end mb-4 ml-4 z-100 text-white">
          {children}
        </div>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed
        convallis magna. In hac habitasse platea dictumst. Suspendisse dapibus,
        lorem eget sodales rhoncus, augue ante imperdiet ipsum, quis rutrum elit
        velit viverra nibh.
      </p>
    </div>
  )
}
