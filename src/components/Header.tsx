import { useEffect, useState } from 'react'
import growthopsLogo from '@/assets/growthops-logo.svg'
import menuLogo from '@/assets/menu-logo.svg'
import menuCloseLogo from '@/assets/menu-close-logo.svg'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Services', href: '#' },
    { name: 'Work', href: '#' },
    { name: 'Insights', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
  ]

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <div className="fixed inset-x-0 z-40 w-full max-w-7xl mx-auto bg-transparent p-2 sm:px-12 sm:py-6">
        <header className="header rounded-full flex justify-between px-4 py-2 sm:px-8 sm:py-4 w-full">
          <img
            src={growthopsLogo.src}
            alt="GrowthOps Logo"
            className="w-10 h-10"
          />
          <button
            aria-label="open menu"
            aria-haspopup="menu"
            onClick={() => setMenuOpen(true)}
            className="flex items-center cursor-pointer gap-2"
          >
            <span className="hidden sm:block font-bold text-sm uppercase">
              Menu
            </span>
            <img src={menuLogo.src} alt="Menu" className="w-10 h-10" />
          </button>
        </header>
      </div>

      <div
        className={`menu fixed inset-0 z-50 transition-opacity duration-300
          ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <div className="px-6 py-4 sm:px-20 sm:py-10 flex justify-between w-full max-w-7xl mx-auto">
          <img
            src={growthopsLogo.src}
            alt="GrowthOps Logo"
            className="w-10 h-10"
          />
          <div className="flex flex-col gap-10 sm:gap-13 items-end">
            <button
              aria-label="Close Menu"
              onClick={() => setMenuOpen(false)}
              className="flex items-center cursor-pointer gap-2"
            >
              <span className="hidden sm:block font-bold text-sm text-right uppercase">
                Close
              </span>
              <img src={menuCloseLogo.src} alt="Menu" className="w-10 h-10" />
            </button>
            <nav className="flex flex-col justify-center h-full gap-10 font-black text-5xl sm:text-6xl text-right uppercase">
              {menuItems.map((item) => (
                <a href={item.href} key={item.name}>
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
