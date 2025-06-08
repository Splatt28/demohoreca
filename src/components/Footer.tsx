import { cn } from '@/lib/utils'

export function Footer() {
  return (
      <footer className={cn("text-white transition-transform duration-500 ease-in-out transform")} style={{ backgroundColor: '#1f3354' }}>
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-1 place-items-center">
              <div>
                <img
                    src="/images/mini-logo-white.png"
                    alt="Sandbox Logo"
                    width={120}
                />
              </div>
            </div>
            <div className="lg:ml-8">
              <h3 className="text-lg font-semibold mb-4">Potrzebna pomoc?</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Pomoc techniczna
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Regulamin
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Polityka Prywatności
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Nawigacja</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    O nas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Sklep
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Usługi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Twoje konto
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-2 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Strefa HoReCa. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
