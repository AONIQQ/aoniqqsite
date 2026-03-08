'use client'

import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cal, { getCalApi } from "@calcom/embed-react"

export default function BookPage() {
  const router = useRouter()

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"})
      cal("ui", {"theme":"dark","hideEventTypeDetails":false,"layout":"month_view"})
    })()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-obsidian text-ink">

      <div className="pointer-events-none fixed inset-0 z-[100] bg-[url('/images/texture.png')] bg-repeat opacity-[0.035] mix-blend-overlay" />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-obsidian/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:px-10">
          <Link href="/">
            <img src="/aoniqq_logo_pack_v1/aoniqq_wordmark_dark.svg" alt="AONIQQ" className="h-[22px] w-auto" />
          </Link>
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 font-mono text-[12px] text-[#999] transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex flex-1 flex-col pt-16">

        <div className="px-6 pb-4 pt-8 text-center md:pb-8 md:pt-14">
          <h1 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] font-medium tracking-[-0.02em] text-white">
            Book a call
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-[#999] md:text-[14px]">
            Pick a time that works. We&apos;ll take it from there.
          </p>
        </div>

        <div className="flex-1 px-3 pb-6 md:px-10 md:pb-8">
          <div className="mx-auto h-full max-w-4xl overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] md:rounded-xl">
            <Cal
              namespace="30min"
              calLink="andrew-olson/30min"
              style={{width:"100%",height:"100%",minHeight:"min(calc(100vh - 200px), 700px)",overflow:"scroll"}}
              config={{"layout":"month_view","theme":"dark"}}
            />
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-4">
            <img src="/aoniqq_logo_pack_v1/aoniqq_wordmark_dark.svg" alt="AONIQQ" className="h-3 w-auto opacity-50" />
            <p className="text-[12px] text-[#555]">&copy; {new Date().getFullYear()} Aoniqq LLC</p>
          </div>
          <div className="flex gap-6">
            <Link href="/tos" className="text-[12px] text-[#555] transition-colors hover:text-[#999]">Terms</Link>
            <Link href="/privacy" className="text-[12px] text-[#555] transition-colors hover:text-[#999]">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
