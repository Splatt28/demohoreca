import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/panel-uzytkownika/_layout')({
  component: PanelLayout,
})

export default function PanelLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
