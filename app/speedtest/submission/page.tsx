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
          <Image
            src="/images/LargeSideLogo.png"
            alt="Aoniqq Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 144px, 144px"
            priority
          />
        </motion.div>
        <div className="w-10" /> {/* Placeholder for layout balance */}
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-blue-900/20 border-blue-400/20">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle className="w-16 h-16 text-green-400" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-center text-white">Submission Successful!</CardTitle>
            <CardDescription className="text-center text-blue-200">Your Full Report Will Be Sent Soon!</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              If you need to contact us in the meantime, feel free to call or text 605-884-6550, or email us at{' '}
              <Link href="mailto:info@aoniqq.com" className="text-blue-300 hover:text-blue-200 underline">
                info@aoniqq.com
              </Link>
            </p>
            <p>
              If you would like help with your current website, or you know someone who does, <Link href="/websitecreation/book" className="text-blue-300 hover:text-blue-200 underline">Book a call here</Link> or click the button below to learn more about our services.
            </p>
            <Button
              onClick={handleGoBack}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Learn About Our Custom Website Creation Service
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="py-6 px-4 md:px-6 border-t border-gray-700 text-center">
        <p className="text-xs text-gray-400">© 2024 Aoniqq LLC. All rights reserved.</p>
      </footer>
    </div>
  )
}