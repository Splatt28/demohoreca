import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { Item } from '@/types/types'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes'
import { useStore } from '@/store/useStore'
import { useShallow } from 'zustand/react/shallow'

export const SearchInput = () => {
  const productList = useStore(useShallow((state) => state.products))
  const [input, setInput] = useState('')
  const navigate = useNavigate({ from: Route.fullPath })
  const [searchResults, setSearchResults] = useState<Item[]>([])
  const deferredInput = useDeferredValue(input)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSearch = useCallback(
    (searchTerm: string) => {
      if (!searchTerm || searchTerm.length < 3) {
        setSearchResults([])
        return
      }
      const searchResult = productList.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSearchResults(searchResult)
    },
    [productList],
  )

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(deferredInput)
    }, 500)
    return () => clearTimeout(handler)
  }, [deferredInput, handleSearch])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSearchResults([])
        setInput('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleNavigate = (productId: string) => {
    setSearchResults([])
    setInput('')
    navigate({
      to: '/$type/$produktId',
      params: { produktId: productId, type: 'produkt' },
    })
  }

  return (
    <div className="relative" ref={containerRef}>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Wyszukaj"
        className="bg-black/10"
      />
      <Search className="absolute top-[9px] right-3 text-black/30" size={16} />
      {!!searchResults.length && (
        <div className="absolute w-[150%] shadow-md bg-white border rounded-sm right-0 top-full flex flex-col gap-2 mt-1 z-10">
          {searchResults.map((searchResult) => (
            <div
              onClick={() => handleNavigate(searchResult.id)}
              key={searchResult.id}
              className="flex w-full gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              <div
                className="w-1/3 bg-cover bg-center bg-no-repeat rounded-sm h-20"
                style={{
                  backgroundImage: `url(${searchResult.images && searchResult.images[0] ? searchResult.images[0] : 'images/placeholder.jpg'})`,
                }}
              ></div>
              <div className="flex-1">
                <p className="font-medium">{searchResult.name}</p>
                <p className="text-sm text-gray-600">{searchResult.price} zł</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
