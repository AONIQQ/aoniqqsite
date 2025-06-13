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
import { GlassButton } from '@/components/ui/GlassButton'
import { HoverButton } from '@/components/ui/HoverButton'
import { TestimonialCard } from '@/components/ui/testimonial-cards'
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel'
import AoniqqLogo from '/public/images/aoniqqlogo.png'

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
      id: 1,
      body: "I have had the pleasure of working with Andrew, the founder of Aoniqq, on projects for multiple years. Throughout our collaborations, Andrew has consistently demonstrated competence, trustworthiness, professionalism, discipline, punctuality, open-mindedness, quick learning ability, and excellent problem-solving skills. His extensive experience is further bolstered by his ability to know when to delegate or call in experts to fill any gaps. In challenging situations, Andrew has shown his ability to perform under pressure and in harsh conditions without slipping up. His technical expertise combined with his ability to work with and manage a team of developers makes him a great resource. For the sake of providing a more specific and helpful review, I'd like to share one of my recent positive experiences with Aoniqq. Aoniqq single-handedly saved a project launch that was being severely mismanaged by a team of supposedly professional developers. The other developers not only failed to do their job correctly but were also an absolute nightmare to work with when corrections were needed. Aoniqq solved the technical issues while also successfully navigating the complicated communication issues with the original dev team to ensure that they provided what was needed for the corrections to be completed. I felt safe trusting Aoniqq to take charge of the process, and they executed flawlessly, leading to a smooth launch for the project. Being able to trust Aoniqq to handle the development side of a project completely allows my team and me to focus our energy on our areas of specialization, opening us up to the most success and growth possible. The peace of mind provided by such confident delegation is priceless. If anyone requires further validation of any claims or would like to learn more about the quality of work I've seen from Andrew and Aoniqq, I would be happy to serve as a reference.",
      author: "Ryan",
      role: "Founder, Pylon Enterprises"
    },
    {
      id: 2,
      body: "Aoniqq is a lifesaver.  After spending 6 months spinning my wheels with another developer, I brought in Andrew from Aoniqq and he accomplished more in our first meeting than had been done in the previous 6 months.  He's been great, building an entire custom website for me to get me exactly the functionality I needed while also fixing all the weird issues that came up while we had been trying to use Webflow.  It's what I want without compromises, and looks better.  I'm even saving money on hosting his tailor-made build compared to the cost of an endless subscription to Webflow or another competitor.  Just considering the final product, Aoniqq is absolutely the way to go.\nFactoring in Andrew's excellent communication, professionalism, cleverness, flexibility, and discipline, I can't recommend Andrew and Aoniqq enough.  His ability to understand and implement 'bleeding-edge' web development tools has also been a huge help.  When I've asked if we need to add a feature, he's always clear about how he would go about it and what the pros and cons would be, allowing me to make a decision based on the final product.  Aoniqq is an excellent service.  When you compare it to other website development services, Aoniqq is truly exceptional.\nI've been recommending Aoniqq to friends and business contacts since I first worked with Andrew and will happily continue to do so.",
      author: "Rob",
      role: "Founder, Remotetutoring.com"
    },
    {
      id: 3,
      body: "Andrew was recommended to assist in the development of the website for our organization. I did not know him or have any experience in designing a website. We desired to have the first features in place by August 12, 2024. Andrew got it done. Phase II required greater effort and periodic revisions as we refined our objectives. Features that we envisioned but did not know how to implement were easily effectuated by Andrew. Tasks first outlined on Friday were accomplished over the weekend. Andrew has been a pleasure to work with.",
      author: "Albert",
      role: "Treasurer, DPE Foundation for Foreign Service Education"
    },
    {
      id: 4,
      body: "I recently had the pleasure of working with Aoniqq on a project and was extremely impressed with their expertise. Their team of developers were not only highly skilled, but also very responsive and efficient in meeting deadlines. One of the things I appreciated most about Aoniqq was their ability to understand our business, and provide tailored solutions based on this information. I highly recommend Aoniqq for anyone in need of the services they offer. Their attention to detail, expertise, and customer service is top-notch. Aoniqq truly exceeded our expectations and we will not hesitate to recommend them and work with them in the future.",
      author: "Josh",
      role: "CEO, Express Solutions"
    },
    {
      id: 5,
      body: "After discussing our plans with the Aoniqq team and asking them more about how they can help fill a gap we had, we were extremely impressed. Their ability to understand our complex business and explain things in a way that was easy to understand enabled us to consider them a true partner, and is what led us to bring them on for ongoing project and strategy management.",
      author: "Fastrack Team",
      role: "Fastrack EDU LLC"
    },
    {
      id: 6,
      body: "After months of working with Aoniqq, I can say without pause, that they are one of the most reliable service providers with whom we have worked. What started with generative art coding services has blossomed into Aoniqq providing overall smart contract consulting and project management. They have taken on the increased scope professionally. They have taken the initiative to research new trends as they emerge in the space. And, they have properly -and timely! - communicated things along the way. We consider Aoniqq to be a true partner in the project.",
      author: "Justin",
      role: "Founder, Bodega Blocks"
    },
    {
      id: 7,
      body: "Aoniqq was fantastic to work with. They have been a great partner in the development of our website as well as various consulting and custom software development needs throughout the last few years. The team is professional, knowledgeable, and always willing to go above and beyond to ensure the project is successful. We look forward to continuing to work with them in the future.",
      author: "Steven",
      role: "Founder, Wall Street Vision"
    },
    {
      id: 8,
      body: "Aoniqq was recommended to the team by an advisor helping out on the project after we had issues with our previous development team. The level of professionalism we received from the team at Aoniqq was something we haven't experienced in web3 before, and it came at the perfect time. Their team was actively engaged in the whole process and their technical knowledge from start to finish allowed us to focus on the growth of the project.",
      author: "Alex",
      role: "Founder, All For One"
    },
    {
      id: 9,
      body: "The team at Aoniqq helped us program all of the contracts and code for our NFT drop and much much more. Andrew from the team came to every meeting and had excellent ideas. Despite changing direction multiple times as the project developed, their team never complained, and their team didn't flinch when the work doubled and then tripled. Highly professional, and especially trustworthy team. Can't wait to work together in the future.",
      author: "Max",
      role: "CEO, Unreal Assets"
    }
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
            src="/images/Finalaoniqqlogo.png"
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
                <a href="#why-aoniqq" onClick={handleNavClick} className="group relative text-[15px] font-medium text-ink transition-colors hover:text-white">
                    What Sets Us Apart
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-tealLux to-royal transition-all duration-300 group-hover:w-full"/>
                </a>
                <a href="#portfolio" onClick={handleNavClick} className="group relative text-[15px] font-medium text-ink transition-colors hover:text-white">
                    Portfolio
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-tealLux to-royal transition-all duration-300 group-hover:w-full"/>
                </a>
                <a href="#testimonials" onClick={handleNavClick} className="group relative text-[15px] font-medium text-ink transition-colors hover:text-white">
                    Testimonials
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-tealLux to-royal transition-all duration-300 group-hover:w-full"/>
                </a>
                <a href="#pricing" onClick={handleNavClick} className="group relative text-[15px] font-medium text-ink transition-colors hover:text-white">
                    Pricing
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-tealLux to-royal transition-all duration-300 group-hover:w-full"/>
                </a>
                <a href="#contact" onClick={handleNavClick} className="group relative text-[15px] font-medium text-ink transition-colors hover:text-white">
                    Contact
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-tealLux to-royal transition-all duration-300 group-hover:w-full"/>
                </a>
              </nav>
              <div className="hidden gap-3 md:flex items-center ml-8">
                <Link href="/speedtest" className="relative px-3 py-1.5 text-sm font-medium text-white transition">
                    Website Speed Test
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-gradient-to-r from-tealLux to-royal"/>
                </Link>
                <Link href="/websitecreation/book" className="relative px-3 py-1.5 text-sm font-medium text-white transition">
                    Book
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-gradient-to-r from-tealLux to-royal"/>
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
                  <a className="text-lg font-medium hover:text-white transition-colors" href="#why-aoniqq" onClick={handleNavClick}>
                    What Sets Us Apart
                  </a>
                  <a className="text-lg font-medium hover:text-white transition-colors" href="#portfolio" onClick={handleNavClick}>
                    Portfolio
                  </a>
                  <a className="text-lg font-medium hover:text-white transition-colors" href="#testimonials" onClick={handleNavClick}>
                    Testimonials
                  </a>
                  <a className="text-lg font-medium hover:text-white transition-colors" href="#pricing" onClick={handleNavClick}>
                    Pricing
                  </a>
                  <a className="text-lg font-medium hover:text-white transition-colors" href="#contact" onClick={handleNavClick}>
                    Contact
                  </a>
                  <Button asChild variant="outline" className="w-full justify-start border-white-_06 hover:bg-white/5 hover:text-white font-semibold">
                    <Link href="/speedtest">Website Speed Test</Link>
                  </Button>
                  <Link href="/websitecreation/book" passHref>
                    <GlassButton className="w-full justify-start" label="Book" />
                  </Link>
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
                  <span className="bg-gradient-to-r from-royal via-royal2 via-45% to-indigo bg-clip-text text-transparent">
                    Tailored to Your Business
                  </span>
                </h1>
                <p className="mx-auto mt-8 max-w-[55ch] text-[18px]/[1.65] text-[#c4c4c4]">
                  Don&apos;t waste valuable time and money on low quality design, poor communication, and long turnaround times. Get a thoughtfully designed website that is optimized for conversions and sales, without having to spend precious time on the development process.
                </p>
                <HoverButton onClick={openContactForm}>
                  <span className="flex items-center">
                  Submit Inquiry
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </HoverButton>
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
                  Our Approach
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

          <TestimonialCarousel testimonials={testimonials} />
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
              <HoverButton onClick={openContactForm}>
                <span className="flex items-center">
                  Submit Inquiry
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </HoverButton>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-8 md:px-12 border-t border-white-_06 font-sans">
        <div className="flex-shrink-0">
          <Image
            src="/images/Finalaoniqqlogo.png"
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