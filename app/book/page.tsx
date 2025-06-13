'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'; 
import Cal, { getCalApi } from "@calcom/embed-react";

export default function BookPage() {
  const router = useRouter()

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"theme":"dark","hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="relative isolate flex flex-col min-h-screen bg-obsidian text-ink">
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-obsidian via-obsidian to-[#11131a]" />
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-[url('/images/texture.png')] opacity-[.06]" />

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
            src="/images/aoniqqlogo.png"
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
        <Card className="w-full max-w-4xl h-[70vh] bg-white/5 border border-white-_06 shadow-diffused-bloom backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-serif font-semibold -tracking-wide text-center text-white">Schedule Your Free Consultation</CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-full">
             <Cal
                namespace="30min"
                calLink="andrew-olson/30min"
                style={{width:"100%",height:"100%",overflow:"scroll"}}
                config={{"layout":"month_view","theme":"dark"}}
              />
          </CardContent>
        </Card>
      </main>

      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-8 md:px-12 border-t border-white-_06 font-sans">
        <div className="flex-shrink-0">
          <Image
            src="/images/aoniqqlogo.png"
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