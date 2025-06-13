'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BookingSuccessPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleGoBack = () => {
    router.push('/websitecreation')
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="px-8 lg:px-12 h-20 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md border-b border-clr-highlight/10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go back</span>
        </Button>
        <motion.div 
          className="relative w-36 h-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link href="/">
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

      <main className="flex-grow flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl bg-clr-surface-1 border border-clr-highlight/10 shadow-card-luxe">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="flex justify-center mb-4"
            >
              <CheckCircle className="w-16 h-16 text-clr-primary" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-center text-clr-text-high font-serif -tracking-wide">Submission Successful!</CardTitle>
            <CardDescription className="text-center text-clr-text-low opacity-[.92]">Your Full Report Will Be Sent Soon!</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 opacity-[.92] leading-relaxed">
              If you need to contact us in the meantime, feel free to call or text 605-884-6550, or email us at{' '}
              <Link href="mailto:info@aoniqq.com" className="text-clr-primary hover:text-clr-primary-light underline">
                info@aoniqq.com
              </Link>
            </p>
            <p className="opacity-[.92] leading-relaxed">
              If you would like help with your current website, or you know someone who does, <Link href="/websitecreation/book" className="text-clr-primary hover:text-clr-primary-light underline">Book a call here</Link> or click the button below to learn more about our services.
            </p>
            <Button
              onClick={handleGoBack}
              className="mt-4 bg-clr-primary hover:bg-clr-primary-light text-clr-text-high font-semibold tracking-wide"
            >
              Learn About Our Custom Website Creation Service
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-8 md:px-12 border-t border-clr-highlight/10">
        <p className="text-xs text-clr-text-low/50 opacity-80">©2025 Aoniqq LLC. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-6 sm:gap-8">
          <Link href="/tos" className="text-xs hover:underline underline-offset-4 text-clr-text-low/50 hover:text-clr-text-low opacity-80">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4 text-clr-text-low/50 hover:text-clr-text-low opacity-80">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}