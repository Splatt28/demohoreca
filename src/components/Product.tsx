import type { Product as ProductProps } from '@/types'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Product = ({ id, img, name, price }: ProductProps) => {
  return (
    <div className="group">
      <Link to={'/produkty'} params={{ produktId: id }}>
        <div className="relative rounded-xl overflow-hidden mb-3">
          <img src={img} className="h-64 mx-auto" />
          <Button className="!bg-stone-800 font-bold text-md w-full absolute bg-white py-8 rounded-t-none translate-y-full bottom-0 opacity-70 group-hover:translate-y-0 hover:opacity-80">
            Zobacz więcej
          </Button>
        </div>
        <div className="flex justify-between">
          <p className="text-stone-950/60 font-semibold text-xl">{name}</p>
          <p className="text-stone-950/60 font-semibold text-xl">{price}</p>
        </div>
      </Link>
    </div>
  )
}
