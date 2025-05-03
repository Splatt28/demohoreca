import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/produkty/$produktId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/produkt/produkt/$produktId"!</div>
}
