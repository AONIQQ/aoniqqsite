'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'; 


export default function BookPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000033] via-[#000066] to-[#0000CC] text-white flex flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-opacity-80 bg-[#000033]">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go back</span>
        </Button>
        <motion.div 
          className="relative w-36 h-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="block"> 
            <Image
              src="/images/LargeSideLogo.png"
              alt="Aoniqq Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 144px, 144px"
              priority
            />
          </Link>
        </motion.div>
        <div className="w-10" /> {/* Placeholder for layout balance */}
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl bg-blue-900/20 border-blue-400/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">Schedule Your Free Consultation with one of our experts</CardTitle>
          </CardHeader>
          <CardContent>
            {isClient && (
              <div className="aspect-video">
                <iframe
                  src="https://calendly.com/aoniqq/consulation"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                ></iframe>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-400/20">
        <p className="text-xs text-gray-400">©2025 Aoniqq LLC. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="/tos" className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-gray-200">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-gray-200">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}