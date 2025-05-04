import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="min-h-[calc(100vh-65px)] py-12 bg-primary/10">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
      <Toaster />
      <Footer />
    </>
  ),
})
