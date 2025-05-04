import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/panel-uzytkownika/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/panel-uzytkownika/"!</div>
}
