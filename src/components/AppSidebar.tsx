'use client'

import { User, Package, FileText } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Link, useMatch } from '@tanstack/react-router'

export function AppSidebar() {
  //   const pathname = usePathname()

  const match = useMatch({ strict: false })

  const menuItems = [
    {
      title: 'Twoje dane',
      icon: User,
      href: '/panel-uzytkownika/twoje-dane',
    },
    {
      title: 'Twoje produkty',
      icon: Package,
      href: '/panel-uzytkownika/twoje-produkty',
    },
    {
      title: 'Twoje usługi',
      icon: Package,
      href: '/panel-uzytkownika/twoje-uslugi',
    },
    {
      title: 'Twoja umowa',
      icon: FileText,
      href: '/panel-uzytkownika/twoja-umowa',
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b mt-16">
        <div className="p-4">
          <h1 className="text-xl font-bold">Panel Sprzedawcy</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={match.id === item.href}
                tooltip={item.title}
              >
                <Link to={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
