"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { HoverButton } from '@/components/ui/HoverButton'

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
        <nav className="md:hidden bg-obsidian/90 backdrop-blur-sm py-4 absolute top-16 left-0 right-0 z-50 border-b border-white-_06">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link href="/websitecreation" passHref>
                <HoverButton className="w-full">Website Creation</HoverButton>
            </Link>
            <Link href="/speedtest" passHref>
                <HoverButton className="w-full">Speed Test</HoverButton>
            </Link>
          </div>
        </nav>
      )}
    </>
  )
}