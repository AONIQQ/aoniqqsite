'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { HoverButton } from '@/components/ui/HoverButton'
import AoniqqLogo from '/public/images/aoniqqlogo.png';

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
    <div className="relative isolate flex flex-col min-h-screen bg-obsidian text-ink">
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-obsidian/55 px-8 py-3 backdrop-blur-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoBack}
          className="text-ink hover:text-white"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go back</span>
        </Button>
        <Link href="/" className="flex-shrink-0">
          <Image
            src={AoniqqLogo}
            alt="Aoniqq Logo"
            width={400}
            height={400}
            className="w-40 h-20 object-contain"
            priority
          />
        </Link>
        <div className="w-10" /> {/* Placeholder for layout balance */}
      </header>

      <main className="flex-grow flex items-center justify-center p-8 pt-24">
        <Card className="w-full max-w-2xl bg-white/5 border border-white-_06 shadow-diffused-bloom backdrop-blur-sm text-center">
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
          <CardContent className="text-ink font-sans">
            <p className="mb-4 opacity-[.92] leading-relaxed">
              If you need to contact us in the meantime, feel free to call or text 605-884-6550, or email us at{' '}
              <Link href="mailto:info@aoniqq.com" className="text-clr-primary hover:text-clr-primary-light underline">
                info@aoniqq.com
              </Link>
            </p>
            <p className="opacity-[.92] leading-relaxed">
              If you would like help with your current website, or you know someone who does, <Link href="/websitecreation/book" className="text-clr-primary hover:text-clr-primary-light underline">Book a call here</Link> or click the button below to learn more about our services.
            </p>
            <HoverButton
              onClick={handleGoBack}
              className="mt-4"
            >
              Learn About Our Custom Website Creation Service
            </HoverButton>
          </CardContent>
        </Card>
      </main>

      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-8 md:px-12 border-t border-white-_06 font-sans">
        <div className="flex-shrink-0">
          <Image
            src={AoniqqLogo}
            alt="Aoniqq Logo"
            width={150}
            height={150}
            className="w-28 h-14 object-contain"
          />
        </div>
        <p className="text-xs text-mute opacity-80 sm:ml-4">©2025 Aoniqq LLC. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-6 sm:gap-8">
          <Link href="/tos" className="text-xs hover:underline underline-offset-4 text-mute hover:text-ink opacity-80">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4 text-mute hover:text-ink opacity-80">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}