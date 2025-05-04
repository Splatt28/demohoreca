import type { Product as ProductProps } from '@/types/types'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Product = ({ id, image, name, price }: ProductProps) => {
  return (
    <div className="group">
      <Link to="/produkt/$produktId" params={{ produktId: id }}>
        <div className="relative rounded-xl overflow-hidden mb-3">
          <img src={image} className="h-64 mx-auto" />
          <Button className="bg-primary font-bold text-md text-white w-full absolute py-8 rounded-t-none translate-y-full bottom-0 opacity-90 group-hover:translate-y-0">
            Zobacz więcej
          </Button>
        </div>
        <div className="flex justify-between">
          <p className="text-primary-text font-semibold text-xl">{name}</p>
          <p className="text-primary-text font-semibold text-xl">{price}</p>
        </div>
      </Link>
    </div>
  )
}
