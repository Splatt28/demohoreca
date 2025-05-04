import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/produkt/$produktId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/produkt/$produktId"!</div>
}
