import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="font-space">
      <div className="!bg-[#f0f0f8]">
        <div className="grow shrink-0"></div>
      </div>
    </div>
  )
}
