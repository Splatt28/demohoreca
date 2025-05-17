import { Map } from '@/components/Map'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/uslugi/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="container">
      <div className="grid grid-cols-2">
        <div></div>
        <Map />
      </div>
    </section>
  )
}
