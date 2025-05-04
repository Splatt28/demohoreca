import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, LogIn, LogOut } from 'lucide-react'
import PlaceholderAvatar from '@/assets/placeholder-avatar.png'
import { Link } from '@tanstack/react-router'

export const Nav = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-primary/70 shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-lg font-semibold tracking-tight text-white flex-1">
          MyLogo
        </div>

        {/* Navigation Menu */}
        <nav className="space-x-6 text-white hidden md:flex">
          <a href="/" className="hover:text-accent transition-colors">
            Home
          </a>
          <Link
            to="/kategoria/$categoryId"
            params={{ categoryId: 'obiekt' }}
            className="hover:text-accent transition-colors"
          >
            Obiekt
          </Link>
          <Link
            to="/kategoria/$categoryId"
            params={{ categoryId: 'artykuly_spozywcze' }}
            className="hover:text-accent transition-colors"
          >
            Artykuły Spożywcze
          </Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 flex-grow justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={PlaceholderAvatar} alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white border border-stone-200 shadow-md"
            >
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogIn className="mr-2 h-4 w-4" />
                Log in
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
