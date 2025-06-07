import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  BookOpen,
  Hammer,
  Headphones,
  Link2,
  Phone,
  Search,
  Settings,
  Shield,
  Tag,
  TrendingUp,
  Users,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20" style={{ backgroundColor: '#f8f2ea' }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1
                className="text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: '#111725' }}
              >
                Nowy kanał sprzedaży dla branży HoReCa – łatwiej, szybciej,
                skuteczniej
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Platforma stworzona z myślą o hotelach, restauracjach i firmach
                cateringowych.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-white font-semibold"
                  style={{ backgroundColor: '#042254' }}
                  onClick={() =>
                    navigate({
                      to: '/kategoria/$categoryId',
                      params: { categoryId: 'elementy_wykonczenia_wnetrz' },
                    })
                  }
                >
                  Nasze produkty
                  <Tag className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  style={{ borderColor: '#042254', color: '#042254' }}
                  onClick={() =>
                    navigate({
                      to: '/uslugi',
                    })
                  }
                >
                  Nasze usługi
                  <Hammer className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/herosection.jpg?height=400&width=600"
                alt="HoReCa marketplace illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Highlight */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              className="mb-4 text-white"
              style={{ backgroundColor: '#d5d68a', color: '#111725' }}
            >
              Strategiczne partnerstwo
            </Badge>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: '#111725' }}
            >
              Strategiczna współpraca z Belcanto – ponad 3000 hoteli na start
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Dzięki współpracy z Belcanto Sp. z o.o., nasza platforma już od
              początku zapewnia dostęp do szerokiej bazy zweryfikowanych
              odbiorców. Twoje produkty trafią do hoteli – od agroturystyk po
              obiekty premium.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20" style={{ backgroundColor: '#f8f2ea' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: '#111725' }}
            >
              Dlaczego warto z nami współpracować?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: '#d5d68a' }}
                >
                  <Users className="h-8 w-8" style={{ color: '#111725' }} />
                </div>
                <CardTitle style={{ color: '#111725' }}>
                  Zasięg i widoczność
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Setki potencjalnych klientów dziennie. Brak opłat startowych.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: '#d5d68a' }}
                >
                  <TrendingUp
                    className="h-8 w-8"
                    style={{ color: '#111725' }}
                  />
                </div>
                <CardTitle style={{ color: '#111725' }}>
                  Model win-win
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Płacisz tylko za efekty: prowizja od sprzedaży lub kliknięcie.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: '#d5d68a' }}
                >
                  <Shield className="h-8 w-8" style={{ color: '#111725' }} />
                </div>
                <CardTitle style={{ color: '#111725' }}>
                  Kontrola marki i kontakt z klientem
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Unikalne linki afiliacyjne, bezpośredni kontakt z kupcem.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: '#d5d68a' }}
                >
                  <Headphones
                    className="h-8 w-8"
                    style={{ color: '#111725' }}
                  />
                </div>
                <CardTitle style={{ color: '#111725' }}>
                  Łatwy start i wsparcie
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Intuicyjny panel, materiały wdrożeniowe i sesje szkoleniowe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: '#111725' }}
            >
              Jak to działa – najważniejsze funkcje
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: '#042254' }}
              >
                <Settings className="h-10 w-10 text-white" />
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: '#111725' }}
              >
                Panel Sprzedawcy
              </h3>
              <p className="text-gray-600">
                Dodawanie produktów, zarządzanie ofertą, statystyki.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: '#042254' }}
              >
                <Search className="h-10 w-10 text-white" />
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: '#111725' }}
              >
                Katalog produktów HoReCa+
              </h3>
              <p className="text-gray-600">
                Precyzyjna segmentacja, rozbudowane filtry.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: '#042254' }}
              >
                <Link2 className="h-10 w-10 text-white" />
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: '#111725' }}
              >
                Mechanizm afiliacyjny
              </h3>
              <p className="text-gray-600">
                Śledzenie kliknięć, linki do sklepu dostawcy.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: '#042254' }}
              >
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: '#111725' }}
              >
                Wsparcie onboardingowe
              </h3>
              <p className="text-gray-600">
                Instrukcje, opieka wdrożeniowa, szybki start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cooperation Process */}
      <section className="py-20" style={{ backgroundColor: '#f8f2ea' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: '#111725' }}
            >
              Jak wygląda współpraca krok po kroku
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center relative">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl z-5 relative"
                  style={{ backgroundColor: '#042254' }}
                >
                  1
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: '#111725' }}
                >
                  Spotkanie i prezentacja oferty
                </h3>
                <p className="text-gray-600">
                  Spersonalizowane podejście, demo platformy i propozycja modelu
                  współpracy.
                </p>
                {/* Connection line */}
                <div
                  className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 transform -translate-y-1/2"
                  style={{ backgroundColor: '#d5d68a' }}
                ></div>
              </div>

              <div className="text-center relative">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl z-5 relative"
                  style={{ backgroundColor: '#042254' }}
                >
                  2
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: '#111725' }}
                >
                  Onboarding i konfiguracja konta
                </h3>
                <p className="text-gray-600">
                  Tworzenie profilu, załadowanie produktów, pierwsze szkolenie.
                </p>
                {/* Connection line */}
                <div
                  className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 transform -translate-y-1/2"
                  style={{ backgroundColor: '#d5d68a' }}
                ></div>
              </div>

              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: '#042254' }}
                >
                  3
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: '#111725' }}
                >
                  Start sprzedaży i wsparcie
                </h3>
                <p className="text-gray-600">
                  Nowy kanał sprzedaży, analityka i dalsze doradztwo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20" style={{ backgroundColor: '#042254' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Gotowy do współpracy?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Dołącz do platformy i dotrzyj do klientów HoReCa szybciej niż
            kiedykolwiek wcześniej.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-black font-semibold"
              style={{ backgroundColor: '#d5d68a' }}
            >
              Umów się na prezentację
              <Phone className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
