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
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <nav className="md:hidden bg-blue-900/90 py-4 absolute top-16 left-0 right-0 z-50">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 text-sm">
              <Link href="/websitecreation">Website Creation</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 text-sm">
              <Link href="/speedtest">Speed Test</Link>
            </Button>
          </div>
        </nav>
      )}
    </>
  )
}