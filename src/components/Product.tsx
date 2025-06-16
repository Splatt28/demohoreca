import type { Item } from '@/types/types'
import { Link, useRouter } from '@tanstack/react-router'

export const Product = ({
  id,
  images,
  name,
  price,
  type,
}: Item & { type: string }) => {
  const router = useRouter()
  return (
    <div className="group relative  transition-all hover:scale-[1.05] overflow-hidden">
      <Link
        to="/$type/$produktId"
        params={{ produktId: id, type }}
        className="block h-full flex flex-col"
      >
        <div
          className="mb-3 h-92 shadow-md bg-cover bg-center bg-no-repeat rounded-sm"
          style={{
            backgroundImage: `url(${router.basepath}${images && images[0] ? images[0] : '/images/placeholder.jpg'})`,
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
