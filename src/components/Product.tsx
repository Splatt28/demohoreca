import { Button } from '@/components/ui/button'
import type { Product as ProductProps } from '@/types/types'
import { Link } from '@tanstack/react-router'

export const Product = ({ id, images, name, price }: ProductProps) => {
  return (
    <div className="group relative bg-white shadow-md p-4 rounded-xl transition-all hover:shadow-xl overflow-hidden">
      <Link to="/produkt/$produktId" params={{ produktId: id }}>
        <div className=" rounded-xl  mb-3">
          <img src={images && images[0] ? images[0] : '/images/placeholder.jpg'} className="h-64 mx-auto py-4" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-primary-text font-semibold text-xl">{name}</p>
          <p className="text-primary-text font-thin text-xl">{price} zł</p>
        </div>
        <Button className="bg-primary/80 font-bold text-md text-white  absolute py-8  rounded-r-none rounded-b-none translate-x-[150%] right-0 bottom-0 opacity-90  group-hover:translate-x-0">
          Zobacz więcej
        </Button>
      </Link>
    </div>
  )
}
