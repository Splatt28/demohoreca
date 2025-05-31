import { createFileRoute, Link } from '@tanstack/react-router'
import categories from '@/assets/data/serviceCategories.json'
import Placeholder from '@/assets/placeholder.jpg'
import { Map } from '@/components/Map'
export const Route = createFileRoute('/mapa-uslug/')({
  component: RouteComponent,
})

export default function RouteComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-lg overflow-hidden bg-slate-50">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-6 md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Nasze usługi
            </h1>
            <p className="text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              sed convallis magna. In hac habitasse platea dictumst. Suspendisse
              dapibus, lorem eget sodales rhoncus, augue ante imperdiet ipsum,
              quis rutrum elit velit viverra nibh. Pellentesque et sem eget
              nulla elementum aliquam nec posuere sapien.{' '}
            </p>
          </div>
          <div className="md:w-1/2 h-48 md:h-64 relative">
            <img
              src={Placeholder}
              alt="Local shopping"
              className="object-cover absolute right-0 h-full w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Znajdź kategorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/uslugi/$categoryId`}
                params={{
                  categoryId: category.slug,
                }}
                className="group"
              >
                <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div className="relative h-32 w-full">
                    <img
                      src={Placeholder}
                      alt={category.name}
                      className="object-cover absolute right-0 h-full w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2 text-center bg-white">
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Znajdź usługi</h2>
            <Map />
          </div>
        </div>
      </div>

      {/* Section footer */}
      <div className="mt-12 p-6 bg-slate-50 rounded-lg text-center">
        <p className="text-slate-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className="mt-2 text-slate-500 text-sm">
          Suspendisse dapibus, lorem eget sodales rhoncus, augue ante imperdiet
          ipsum, quis rutrum elit velit viverra nibh.
        </p>
      </div>
    </div>
  )
}
