'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'

const ease = [0.25, 0.1, 0.25, 1] as const

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease },
}

function RevealText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, filter: 'blur(8px)', y: 6 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ delay: delay + i * 0.08, duration: 0.5, ease }}
        >
          {word}{'\u00A0'}
        </motion.span>
      ))}
    </span>
  )
}

const quotes = [
  { quote: 'Being able to trust Aoniqq to handle the development side of a project completely allows my team and I to focus our energy on our areas of specialization. The peace of mind provided by such confident delegation is priceless.', name: 'Ryan', co: 'Founder, Pylon Enterprises' },
  { quote: "After spending 6 months spinning my wheels with another developer, I brought in Andrew and he accomplished more in our first meeting than had been done in the previous 6 months. I can't recommend Aoniqq enough.", name: 'Rob', co: 'Founder, Remotetutoring.com' },
  { quote: 'Features that we envisioned but did not know how to implement were easily effectuated by Andrew. Tasks first outlined on Friday were accomplished over the weekend.', name: 'Albert', co: 'Treasurer, DPE Foundation' },
  { quote: 'Aoniqq was fantastic to work with. They have been a great partner in the development of our website as well as various consulting and custom software development needs throughout the last few years. The team is professional, knowledgeable, and always willing to go above and beyond to ensure the project is successful.', name: 'Steven', co: 'Founder, Wall Street Vision' },
]

export default function Component() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeQuote, setActiveQuote] = useState(0)

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    if (href) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Clients', href: '#clients' },
  ]

  return (
    <div className="flex min-h-screen flex-col">

      <div className="pointer-events-none fixed inset-0 z-[100] bg-[url('/images/texture.png')] bg-repeat opacity-[0.035] mix-blend-overlay" />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-[60] border-b border-white/[0.06] bg-obsidian/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:px-10">
          <Link href="/" className="relative z-[70]">
            <img src="/aoniqq_logo_pack_v1/aoniqq_wordmark_dark.svg" alt="AONIQQ" className="h-[22px] w-auto" />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={scrollTo}
                className="font-mono text-[12px] text-[#999] transition-colors duration-200 hover:text-white">
                {item.label}
              </a>
            ))}
            <Link href="/book"
              className="rounded-full border border-white/[0.12] px-5 py-1.5 text-[13px] font-medium text-[#ddd] transition-all duration-200 hover:bg-white hover:text-black">
              Inquiries
            </Link>
          </nav>
          <button className="relative z-[70] text-[#999] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-obsidian pt-16 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex flex-col items-center gap-7">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={scrollTo} className="font-display text-[28px] font-medium tracking-[-0.02em] text-white">{item.label}</a>
              ))}
              <a href="/book" onClick={() => setMenuOpen(false)} className="font-display text-[28px] font-medium tracking-[-0.02em] text-white">Inquiries</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-16">

        {/* HERO */}
        <section className="flex min-h-[85vh] flex-col justify-center px-6 md:min-h-[90vh] md:px-10">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="text-center md:text-left">
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease }}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#555]"
              >
                Software · Systems · Advisory
              </motion.p>
              <h1 className="mt-6 mx-auto max-w-2xl font-display text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white md:mx-0">
                <RevealText text="Software, systems," delay={0.2} />
                <br />
                <RevealText text="and select advisory." delay={0.5} />
              </h1>
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease }}
                className="mt-8 h-px w-24 mx-auto origin-center bg-gradient-to-r from-[#34D4C8] via-[#4D73FF] to-[#8B5CF6] shadow-[0_0_8px_rgba(77,115,255,0.25),0_0_16px_rgba(52,212,200,0.1)] md:mx-0 md:origin-left"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease }}
                className="mt-8 mx-auto max-w-md text-[15px] leading-[1.75] text-[#aaa] md:mx-0"
              >
                We partner with a small number of companies on technical
                execution and startups where calm judgment matters.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6, ease }}
                className="mt-10"
              >
                <Link href="/book"
                  className="group inline-flex items-center gap-2 text-[14px] font-medium text-white transition-colors duration-200 hover:text-[#ccc]">
                  Start a conversation
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Spectral divider */}
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <motion.div {...fade} className="h-px bg-gradient-to-r from-[#34D4C8]/40 via-[#4D73FF]/25 to-[#8B5CF6]/20" />
        </div>

        {/* THESIS — Principal-access positioning (the strongest differentiator, now leads) */}
        <section id="about" className="px-6 py-20 md:px-10 md:py-32 lg:py-40">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-6 md:grid-cols-[240px_1fr] md:gap-16 lg:grid-cols-[280px_1fr] lg:gap-20">
              <motion.div {...fade}>
                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#888]">How we operate</p>
              </motion.div>
              <motion.div {...fade} transition={{ ...fade.transition, delay: 0.1 }}>
                <p className="max-w-xl font-display text-[clamp(1.1rem,2vw,1.4rem)] font-normal leading-[1.65] tracking-[-0.01em] text-[#ccc]">
                  Small client roster. Direct principal access on every engagement.
                  No account managers, no handoffs, no layers between you and the
                  people doing the work.
                </p>
                <div className="mt-8 h-px w-16 bg-gradient-to-r from-[#34D4C8]/40 via-[#4D73FF]/30 to-transparent" />
                <p className="mt-8 max-w-lg text-[15px] leading-[1.8] text-[#999]">
                  Aoniqq was built on a simple premise: companies deserve technical
                  partners who operate with the same care, discretion, and judgment
                  they bring to their own work.
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-px w-4 bg-[#4D73FF]/30" />
                  <p className="font-mono text-[12px] text-[#777]">Andrew Olson, Founder</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Spectral divider */}
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="h-px bg-gradient-to-r from-transparent via-[#4D73FF]/20 to-[#8B5CF6]/30" />
        </div>

        {/* AREAS OF WORK */}
        <section id="work" className="px-6 py-20 md:px-10 md:py-32 lg:py-40">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-6 md:grid-cols-[240px_1fr] md:gap-16 lg:grid-cols-[280px_1fr] lg:gap-20">
              <motion.div {...fade}>
                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#888]">Areas of work</p>
                <p className="mt-4 text-[13px] italic leading-relaxed text-[#555] md:mt-6">
                  We also build and operate<br className="hidden md:block" /> our own software.
                </p>
              </motion.div>
              <div>
                {[
                  { title: 'Software Development', body: 'End-to-end technical execution across custom applications, SaaS products, AI integration, and complex distributed systems. Built for scale, security, and long-term maintainability.' },
                  { title: 'Digital Products', body: 'High-performance websites and digital products for companies that value craft. Corporate platforms, specialized tools, and everything in between.' },
                  { title: 'Strategic Advisory', body: 'Technical consulting and project leadership for companies navigating critical buildouts and startups.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    {...fade}
                    transition={{ ...fade.transition, delay: i * 0.1 }}
                    className={`py-7 ${i > 0 ? 'border-t border-white/[0.06]' : ''}`}
                  >
                    <h3 className="font-display text-[15px] font-medium tracking-[-0.01em] text-white">{item.title}</h3>
                    <p className="mt-2.5 max-w-lg text-[14px] leading-[1.75] text-[#999]">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Spectral divider */}
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="h-px bg-gradient-to-r from-[#8B5CF6]/20 via-[#4D73FF]/20 to-[#34D4C8]/30" />
        </div>

        {/* CLIENTS */}
        <section id="clients" className="px-6 py-20 md:px-10 md:py-32 lg:py-40">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-6 md:grid-cols-[240px_1fr] md:gap-16 lg:grid-cols-[280px_1fr] lg:gap-20">
              <motion.div {...fade}>
                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#888]">Clients</p>
              </motion.div>
              <div>
                {quotes.map((t, i) => (
                  <motion.blockquote
                    key={t.name}
                    {...fade}
                    transition={{ ...fade.transition, delay: i * 0.08 }}
                    className={`relative cursor-pointer border-t border-white/[0.06] py-6 pl-6 transition-all duration-300 first:border-0 md:pl-8 ${activeQuote === i ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                    onMouseEnter={() => setActiveQuote(i)}
                    onClick={() => setActiveQuote(i)}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-[#34D4C8] via-[#4D73FF] to-[#8B5CF6] transition-opacity duration-300 ${activeQuote === i ? 'opacity-70' : 'opacity-0'}`}
                    />
                    <p className={`max-w-xl leading-[1.75] text-[#ccc] transition-all duration-300 ${activeQuote === i ? 'text-[clamp(0.95rem,1.5vw,1.125rem)] font-display font-normal tracking-[-0.01em]' : 'text-[14px]'}`}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-2">
                      <span className="text-[13px] font-medium text-white">{t.name}</span>
                      <span className="text-[#444]">&middot;</span>
                      <span className="font-mono text-[11px] text-[#777]">{t.co}</span>
                    </div>
                  </motion.blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 md:px-10 md:py-32 lg:py-40">
          <div className="mx-auto max-w-[1280px]">
            <motion.div {...fade}>
              <div className="mb-12 h-px bg-gradient-to-r from-[#34D4C8]/30 via-[#4D73FF]/20 to-[#8B5CF6]/25 md:mb-16" />
              <div className="text-center md:text-left md:grid md:grid-cols-[1fr_auto] md:items-end md:gap-12">
                <div>
                  <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.02em] text-white">
                    Start a conversation
                  </h2>
                  <p className="mt-3 mx-auto max-w-sm text-[14px] leading-relaxed text-[#999] md:mx-0">
                    We take on a limited number of engagements at any given time.
                    If there&apos;s a fit, we&apos;d like to hear from you.
                  </p>
                </div>
                <Link href="/book"
                  className="group mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-white transition-colors duration-200 hover:text-[#ccc] md:mt-0">
                  Inquiries
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
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
