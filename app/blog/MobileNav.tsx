"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

export default function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <nav className="md:hidden bg-clr-surface-1/90 backdrop-blur-sm py-4 absolute top-16 left-0 right-0 z-50 border-b border-clr-highlight/10">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Button asChild className="font-sans font-semibold tracking-wide uppercase bg-gradient-to-r from-clr-primary-light to-clr-primary-dark text-clr-text-high font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm">
              <Link href="/websitecreation">Website Creation</Link>
            </Button>
            <Button asChild className="font-sans font-semibold tracking-wide uppercase bg-gradient-to-r from-clr-primary-light to-clr-primary-dark text-clr-text-high font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm">
              <Link href="/speedtest">Speed Test</Link>
            </Button>
          </div>
        </nav>
      )}
    </>
  )
}