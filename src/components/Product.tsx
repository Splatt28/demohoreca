import type { Item } from '@/types/types'
import { Link } from '@tanstack/react-router'

export const Product = ({ id, images, name, price }: Item) => {
  return (
    <div className="group relative  transition-all hover:scale-[1.05] overflow-hidden">
      <Link
        to="/produkt/$produktId"
        params={{ produktId: id }}
        className="block h-full flex flex-col"
      >
        <div
          className="mb-3 h-92 shadow-md bg-cover bg-center bg-no-repeat rounded-sm"
          style={{
            backgroundImage: `url(${images && images[0] ? images[0] : '/images/placeholder.jpg'})`,
          }}
        ></div>
        <div className="flex flex-col gap-[5px] flex-1 justify-between">
          <p className="text-primary-text font-semibold text-xl">{name}</p>
          <p className="text-black/40 font-thin text-xl">{price} zł</p>
        </div>
      </Link>
    </div>
  )
}
