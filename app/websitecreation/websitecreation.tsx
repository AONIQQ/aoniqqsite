'use client'

import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react'
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar, ChevronRight, ChevronLeft, Menu, X, Star, ArrowRight, DollarSign, CheckCircle2, AlertTriangle, Quote } from "lucide-react"
import Link from 'next/link'
import clsx from 'clsx'
import { Timeline } from '@/components/ui/timeline'

// Lazy load components
const LazyWebsiteJourneyMap = lazy(() => import('./website-journey-map'))
const LazyPricingSlider = lazy(() => import('./PricingSlider'))
const LazyPortfolio = lazy(() => import('./Portfolio'))
const LazyContactForm = lazy(() => import('@/components/ContactForm'))

const motionProps = {
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
};

export default function WebsiteCreation() {
  const [currentReview, setCurrentReview] = useState(0)
  const [expandedReviews, setExpandedReviews] = useState<boolean[]>([])
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false)

  const testimonials = useMemo(() => [
    {
      body: "I have had the pleasure of working with Andrew, the founder of Aoniqq, on projects for multiple years. Throughout our collaborations, Andrew has consistently demonstrated competence, trustworthiness, professionalism, discipline, punctuality, open-mindedness, quick learning ability, and excellent problem-solving skills. His extensive experience is further bolstered by his ability to know when to delegate or call in experts to fill any gaps. In challenging situations, Andrew has shown his ability to perform under pressure and in harsh conditions without slipping up. His technical expertise combined with his ability to work with and manage a team of developers makes him a great resource. For the sake of providing a more specific and helpful review, I'd like to share one of my recent positive experiences with Aoniqq. Aoniqq single-handedly saved a project launch that was being severely mismanaged by a team of supposedly professional developers. The other developers not only failed to do their job correctly but were also an absolute nightmare to work with when corrections were needed. Aoniqq solved the technical issues while also successfully navigating the complicated communication issues with the original dev team to ensure that they provided what was needed for the corrections to be completed. I felt safe trusting Aoniqq to take charge of the process, and they executed flawlessly, leading to a smooth launch for the project. Being able to trust Aoniqq to handle the development side of a project completely allows my team and me to focus our energy on our areas of specialization, opening us up to the most success and growth possible. The peace of mind provided by such confident delegation is priceless. If anyone requires further validation of any claims or would like to learn more about the quality of work I've seen from Andrew and Aoniqq, I would be happy to serve as a reference.",
      author: "Ryan",
      role: "Founder, Pylon Enterprises"
    },
    {
      body: "Aoniqq is a lifesaver.  After spending 6 months spinning my wheels with another developer, I brought in Andrew from Aoniqq and he accomplished more in our first meeting than had been done in the previous 6 months.  He's been great, building an entire custom website for me to get me exactly the functionality I needed while also fixing all the weird issues that came up while we had been trying to use Webflow.  It's what I want without compromises, and looks better.  I'm even saving money on hosting his tailor-made build compared to the cost of an endless subscription to Webflow or another competitor.  Just considering the final product, Aoniqq is absolutely the way to go.\nFactoring in Andrew's excellent communication, professionalism, cleverness, flexibility, and discipline, I can't recommend Andrew and Aoniqq enough.  His ability to understand and implement 'bleeding-edge' web development tools has also been a huge help.  When I've asked if we need to add a feature, he's always clear about how he would go about it and what the pros and cons would be, allowing me to make a decision based on the final product.  Aoniqq is an excellent service.  When you compare it to other website development services, Aoniqq is truly exceptional.\nI've been recommending Aoniqq to friends and business contacts since I first worked with Andrew and will happily continue to do so.",
      author: "Rob",
      role: "Founder, Remotetutoring.com"
    },
    {
      body: "Andrew was recommended to assist in the development of the website for our organization. I did not know him or have any experience in designing a website. We desired to have the first features in place by August 12, 2024. Andrew got it done. Phase II required greater effort and periodic revisions as we refined our objectives. Features that we envisioned but did not know how to implement were easily effectuated by Andrew. Tasks first outlined on Friday were accomplished over the weekend. Andrew has been a pleasure to work with.",
      author: "Albert",
      role: "Treasurer, DPE Foundation for Foreign Service Education"
    },
    {
      body: "I recently had the pleasure of working with Aoniqq on a project and was extremely impressed with their expertise. Their team of developers were not only highly skilled, but also very responsive and efficient in meeting deadlines. One of the things I appreciated most about Aoniqq was their ability to understand our business, and provide tailored solutions based on this information. I highly recommend Aoniqq for anyone in need of the services they offer. Their attention to detail, expertise, and customer service is top-notch. Aoniqq truly exceeded our expectations and we will not hesitate to recommend them and work with them in the future.",
      author: "Josh",
      role: "CEO, Express Solutions"
    },
    {
      body: "Our Design assets and our website were delivered ahead of schedule, and exceeded our expectations. We were able to be truly hands off throughout the process, which was extremely valuable, as we are already extremely busy. After discussing the project with the Aoniqq team and seeing their attention to detail, we knew we had made the right decision. In past projects of ours, web development has been a huge headache because of the necessity to micromanage developers. This was not the case with Aoniqq, which made working with them a breath of fresh air.",
      author: "Fastrack Team",
      role: "Fastrack EDU LLC"
    },
  ], [])

  useEffect(() => {
    setExpandedReviews(new Array(testimonials.length).fill(false))
  }, [testimonials])

  const nextReview = useCallback(() => {
    setCurrentReview((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prevReview = useCallback(() => {
    setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const toggleExpandReview = useCallback((index: number) => {
    setExpandedReviews(prev => {
      const newExpanded = [...prev]
      newExpanded[index] = !newExpanded[index]
      return newExpanded
    })
  }, [])

  const truncateText = useCallback((text: string, sentences: number) => {
    const sentenceArray = text.match(/[^.!?]+[.!?]+/g) || []
    return sentenceArray.slice(0, sentences).join(' ')
  }, [])

  const openContactForm = useCallback(() => {
    setIsContactFormOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeContactForm = useCallback(() => {
    setIsContactFormOpen(false)
    document.body.style.overflow = 'auto'
  }, [])

  const handleNavClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const href = event.currentTarget.getAttribute('href')
    if (href) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeContactForm()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [closeContactForm])

  useEffect(() => {
    const checkNavbarCollapse = () => {
      const breakpoint = 1024 // lg breakpoint
      setIsNavbarCollapsed(window.innerWidth < breakpoint)
    }

    checkNavbarCollapse()
    window.addEventListener('resize', checkNavbarCollapse)

    return () => {
      window.removeEventListener('resize', checkNavbarCollapse)
    }
  }, [])

  return (
    <div className="relative isolate flex flex-col min-h-screen bg-obsidian text-ink">
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-obsidian via-obsidian to-[#11131a]" />
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-[url('/images/texture.png')] opacity-[.06]" />
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-obsidian/55 px-8 py-3 backdrop-blur-md">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo-nav-uppercase.svg"
            alt="Aoniqq Logo"
            width={300}
            height={300}
            className="w-40 h-20 object-contain"
            priority
          />
        </Link>
        <div className="flex items-center">
          {!isNavbarCollapsed ? (
            <>
              <nav className="hidden gap-9 md:flex">
                {['Why Aoniqq', 'Portfolio', 'Testimonials', 'Pricing', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={handleNavClick} className="group relative text-[15px] font-medium text-ink transition-colors hover:text-white">
                    {item}
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-tealLux to-royal transition-all duration-300 group-hover:w-full"/>
                  </a>
                ))}
              </nav>
              <div className="hidden gap-3 md:flex items-center ml-8">
                <Link href="/speedtest" className="px-3 py-1.5 text-sm font-medium text-ink hover:text-white transition">
                  Website Speed Test
                </Link>
                <Link href="/websitecreation/book" className="px-3 py-1.5 text-sm font-medium text-ink hover:text-white transition">
                  Book
                </Link>
              </div>
            </>
          ) : (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden ml-4 border-white-_06">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-obsidian border-l border-white-_06">
                <nav className="flex flex-col gap-8 mt-12 font-sans">
                  {['Why Aoniqq', 'Portfolio', 'Testimonials', 'Pricing', 'Contact'].map((item) => (
                    <a key={item} className="text-lg font-medium hover:text-white transition-colors" href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={handleNavClick}>
                      {item}
                    </a>
                  ))}
                  <Button asChild variant="outline" className="w-full justify-start border-white-_06 hover:bg-white/5 hover:text-white font-semibold">
                    <Link href="/speedtest">Website Speed Test</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start border-white-_06 hover:bg-white/5 hover:text-white font-semibold">
                    <Link href="/websitecreation/book">Book</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </header>
      <main className="flex-1">
        <section className="relative isolate flex min-h-[92vh] flex-col items-center justify-center px-6 text-center pt-20">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[520px] w-[520px] rounded-full bg-[rgba(36,84,255,.05)] blur-[120px]" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[url('/images/texture.png')] opacity-[.02] mix-blend-overlay" />
          
          <div className="container mx-auto px-8 max-w-7xl z-10">
              <div className="flex flex-col items-center space-y-8 text-center">
                <h1 className="font-serif font-black tracking-[-.025em] text-[clamp(48px,8vw,108px)] leading-[1.05] text-white">
                    Get a Fast, Functional, and Fully Customized Website
                    <br />
                    <span className="bg-gradient-to-r from-royal to-royal2 bg-clip-text text-transparent">Tailored to Your Business</span>
                </h1>
                <p className="mx-auto mt-8 max-w-[55ch] text-[18px]/[1.65] text-[#c4c4c4]">
                  Don&apos;t waste valuable time and money on low quality design, poor communication, and long turnaround times. Get a thoughtfully designed website that is optimized for conversions and sales, without having to spend precious time on the development process.
                </p>
                <a href="#contact"
                   className="group relative mt-14 inline-flex rounded-full bg-gradient-to-br from-royal to-royal2 px-10 py-4 font-sans text-[15px] font-semibold uppercase tracking-wide text-white shadow-[0_0_0_3px_rgba(255,255,255,.08)_inset] transition duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tealLux">
                  Submit Inquiry
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>
          </div>
        </section>
        
        <section id="why-aoniqq" className="w-full py-16 md:py-24 bg-transparent">
          <div className="mx-auto max-w-6xl px-8">
            <h2 className="mb-16 text-center font-serif text-[46px] font-semibold tracking-[-.01em] text-white">
              What Sets Us Apart
            </h2>
            <div className="grid gap-12 md:grid-cols-2">
              <motion.article 
                className="relative overflow-hidden rounded-2xl bg-[#0d0d0d]/90 p-10 ring-1 ring-inset ring-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .45, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[#ff3b3b]/20 blur-[4px]" />
                <span className="pointer-events-none absolute -top-10 left-0 h-20 w-[150%] -rotate-4 bg-[#0d0d0d]/90" />
                <h3 className="mb-8 font-serif text-2xl font-semibold text-mute">
                  Common Issues with Other Website Developers
                </h3>
                <ul className="space-y-5 text-[17px] leading-[1.55] text-mute font-sans">
                  {[
                    "Slow Load Times",
                    "Poor Mobile Responsiveness",
                    "Overcomplicated Design",
                    "Generic Templates",
                    "Security Vulnerabilities",
                    "Lack of SEO Optimization",
                    "Limited Customization",
                    "Unclear or Difficult Backend",
                    "Inefficient Communication",
                    "Delays in Launch"
                  ].map((issue) => (
                    <li key={issue} className="flex items-start gap-3">
                      <AlertTriangle className="mt-[3px] h-4 w-4 flex-none text-[#ff3b3b]/70" aria-hidden="true" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>

              <motion.article 
                className="relative overflow-hidden rounded-2xl bg-[rgba(36,84,255,.08)] backdrop-blur-md p-10 ring-1 ring-inset ring-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .45, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-tealLux/30 blur-[4px]" />
                <span className="pointer-events-none absolute -top-10 left-0 h-20 w-[150%] rotate-4 bg-[rgba(36,84,255,.08)]" />
                <h3 className="mb-8 font-serif text-2xl font-semibold text-white">
                  Aoniqq&apos;s Approach
                </h3>
                <ul className="space-y-5 text-[17px] leading-[1.55] text-ink font-sans">
                  {[
                    "Fast Load Times",
                    "Mobile Responsiveness Guaranteed",
                    "Clean & User-Friendly Design",
                    "Custom Tailored Solutions",
                    "Top-Level Security",
                    "SEO Built-In",
                    "Full Customization",
                    "Easy-to-Use Backend",
                    "Clear, Consistent Communication",
                    "On-Time Delivery"
                  ].map((gain) => (
                    <li key={gain} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-[3px] h-4 w-4 flex-none text-tealLux" aria-hidden="true" />
                      <span>{gain}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </div>
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .45, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <Suspense fallback={<div className="text-center font-sans">Loading...</div>}>
                <LazyWebsiteJourneyMap />
              </Suspense>
            </motion.div>
          </div>
        </section>

        <section id="portfolio" className="w-full py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-8 max-w-6xl">
            <h2 className="text-5xl font-serif font-bold -tracking-wider text-center mb-16 text-white">
              Some of Our Most Recent Portfolio Websites
            </h2>
            <Suspense fallback={<div className="text-center font-sans">Loading portfolio...</div>}>
              <LazyPortfolio />
            </Suspense>
          </div>
        </section>

        <section id="testimonials" className="relative py-28">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[480px] w-[480px] rounded-full bg-[rgba(36,84,255,.05)] blur-[120px]" />
            </div>

            <h2 className="mb-20 text-center font-serif text-[46px] font-semibold text-white">
              Client Reviews
            </h2>

            <AnimatePresence mode="wait">
              <motion.article
                key={currentReview}
                initial={{ opacity: 0, y: 24, scale: .96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: .45, ease: 'easeOut' }}
                className="relative mx-auto flex max-w-6xl flex-col items-center rounded-2xl bg-[rgba(36,84,255,.03)] p-12 backdrop-blur-md ring-1 ring-inset ring-white/10"
              >
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(255,255,255,.06)] backdrop-blur-md ring-1 ring-inset ring-white/10">
                  <Quote className="h-8 w-8 text-royal" />
                </div>

                <blockquote className="text-center font-serif italic text-[19px]/[1.65] text-ink text-balance">
                  {testimonials[currentReview].body}
                </blockquote>

                <figcaption className="mt-10 font-sans text-[14px] uppercase tracking-wide text-white/85">
                  {testimonials[currentReview].author} | {testimonials[currentReview].role}
                </figcaption>

                <div className="mt-12 flex flex-col items-center gap-6">
                  <div className="flex gap-4">
                    <button onClick={prevReview} aria-label="Previous"
                      className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(255,255,255,.06)] backdrop-blur-md ring-1 ring-inset ring-white/10 transition hover:bg-[rgba(255,255,255,.09)]">
                      <ChevronLeft className="h-4 w-4 text-ink" />
                    </button>
                    <button onClick={nextReview} aria-label="Next"
                      className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(255,255,255,.06)] backdrop-blur-md ring-1 ring-inset ring-white/10 transition hover:bg-[rgba(255,255,255,.09)]">
                      <ChevronRight className="h-4 w-4 text-ink" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <span key={i}
                        className={clsx(
                          'h-1.5 rounded-full transition-all duration-300',
                          currentReview === i
                            ? 'w-6 bg-tealLux'
                            : 'w-1.5 bg-tealLux/30'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
        </section>

        <section id="pricing" className="w-full py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-8 max-w-6xl">
            <h2 className="text-5xl font-serif font-bold -tracking-wider text-center mb-16 text-white">
              Pricing
            </h2>
            <Suspense fallback={<div className="text-center font-sans">Loading pricing...</div>}>
              <LazyPricingSlider openContactForm={openContactForm} />
            </Suspense>
          </div>
        </section>

        <section id="contact" className="w-full py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-8 max-w-6xl">
            <div className="flex flex-col items-center space-y-8 text-center">
              <h2 className="text-5xl font-serif font-bold -tracking-wider text-white">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[700px] md:text-xl text-ink font-sans leading-relaxed">
                Get in touch with us to discuss your project needs via email, text, call, or by submitting the form below.
              </p>
              <motion.div 
                className="space-y-2 text-ink"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true }}
              >
                <p>1007 N Orange St</p>
                <p>Wilmington, DE, 19801</p>
                <p>info@aoniqq.com</p>
                <p>605-884-6550</p>
              </motion.div>
              <a href="/book"
                 className="group relative mt-14 inline-flex rounded-full bg-gradient-to-br from-royal to-royal2 px-10 py-4 font-sans text-[15px] font-semibold uppercase tracking-wide text-white shadow-[0_0_0_3px_rgba(255,255,255,.08)_inset] transition duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tealLux">
                Submit Inquiry
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-8 md:px-12 border-t border-white-_06 font-sans">
        <p className="text-xs text-mute opacity-80">©2025 Aoniqq LLC. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-6 sm:gap-8">
          <Link href="/tos" className="text-xs hover:underline underline-offset-4 text-mute hover:text-ink opacity-80">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4 text-mute hover:text-ink opacity-80">
            Privacy Policy
          </Link>
        </nav>
      </footer>
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm font-sans">
          <motion.div 
            className="bg-obsidian/80 border border-white-_06 shadow-diffused-bloom p-8 rounded-lg max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-semibold text-white">Contact Us</h2>
              <Button 
                onClick={closeContactForm} 
                variant="ghost"
                className="text-mute hover:text-white"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <Suspense fallback={<div className="text-center">Loading form...</div>}>
              <LazyContactForm isOpen={isContactFormOpen} onClose={closeContactForm} redirectUrl="/websitecreation/inquirysubmitted" />
            </Suspense>
          </motion.div>
        </div>
      )}
    </div>
  )
}