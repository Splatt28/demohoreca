import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useShallow } from 'zustand/react/shallow'
import { useStore } from '@/store/useStore'
import { useEffect } from 'react'

export const Route = createFileRoute('/panel-uzytkownika/_layout')({
  component: PanelLayout,
})

export default function PanelLayout() {
  const navigate = useNavigate()
  const { isLoggedIn } = useStore(
    useShallow((state) => ({
      isLoggedIn: state.isLoggedIn,
    })),
  )

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: '/' })
    }
  }, [isLoggedIn])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
