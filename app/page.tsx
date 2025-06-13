'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar, Code, Briefcase, ChevronRight, ChevronLeft, Menu, X, Star, Quote, CheckCircle2, MessageCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { HoverSlider, HoverSliderContentWrap, HoverSliderDescription, TextStaggerHover } from '@/components/ui/hover-slider'
import { cn } from '@/lib/utils'
import { Timeline } from '@/components/ui/timeline'
import clsx from 'clsx'
import { HoverButton } from '@/components/ui/HoverButton'
import { ShuffleCards, TestimonialCard } from '@/components/ui/testimonial-cards'
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel'

const motionProps = {
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
};

export default function Component() {
  const [currentReview, setCurrentReview] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeWhySection, setActiveWhySection] = useState(1)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [expandedReviews, setExpandedReviews] = useState<boolean[]>(Array(8).fill(false))

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

  const services = [
    { 
      title: "Full Stack Development", 
      content: (
        <p className="text-ink text-[17px]/[1.6] max-w-[55ch]">
          We have built the technical aspects of projects in different industries from the ground up. We are constantly researching and learning new technologies to provide the most effective solutions. We&apos;ve built everything from software as a service (SaaS) products, full scale custom applications and dashboards, algorithm systems, AI integration tools, to complex smart contract systems and more. Our focus is on balancing the fastest, most secure, and most scalable solutions with cost-effectiveness.
        </p>
      )
    },
    { 
      title: "Website Development", 
      content: (
        <p className="text-ink text-[17px]/[1.6] max-w-[55ch]">
          We have a rich history in creating fast, responsive, and aesthetic websites for massive corporations, ecommerce brands, service professionals, startups, foundations, politicians, local businesses, and many others. Our core offer is centered around our ability to create a website that is tailored to your needs, without the headache of a long development process, or having to micromanage every aspect of the project. We have a deep knowledge of effective copywriting and SEO, to ensure your website is not only aesthetically pleasing, but also effective in achieving your business goals.
        </p>
      ) 
    },
    { 
      title: "Project & Team Management & Consulting", 
      content: (
        <p className="text-ink text-[17px]/[1.6] max-w-[55ch]">
          Our constant pursuit of new information and trends, as well as our track record of success in multiple industries, makes us an excellent resource to provide consultation on, or manage your project. We have experience in managing projects of all sizes from scaling small business operations, to startup launches, to massive corporate projects. Using our diverse knowledge base, we are able to provide a comprehensive approach towards complex problems and roadblocks that businesses from a variety of sectors are facing.
        </p>
      ) 
    }
  ]

  const whySections = useMemo(() => [
    {
      title: "Tailored Approach",
      content: "You've probably experienced the frustration of working with developers who don't understand your business or project, and it feels like you're just being given a generic solution. We understand that every business and project is unique, and our team works closely with you to develop a personalized plan that meets your specific needs. We ensure what we deliver is exactly what you need, and we're always here to answer questions and make adjustments as needed.",
      icon: <CheckCircle2 className="h-8 w-8" />
    },
    {
      title: "Expert Communication",
      content: "We understand that developers often don't communicate well, and it can be extremely frustrating. We take an approach to the management of your project that is deeply rooted in communication. Our customers place a lot of value on our ability to bridge the gap and explain the relationship between complex technical work and business objectives, which allows them to not have to micromanage. Our commitment to clear, consistent communication and explaining complex technical concepts in a way that is easy to understand sets us apart in the industry.",
      icon: <MessageCircle className="h-8 w-8" />
    },
    {
      title: "Industry Experience",
      content: "Our extensive experience across multiple industries enables us to offer solutions to even the most complex roadblocks your business may face. We have experience in the most cutting edge technologies, and we are constantly learning and adapting to new trends. From small business operations, to startups, to massive corporate projects, we have the experience to help you. And if we don't have experience in your industry, we'll be honest about that too, and direct you towards someone who can better serve you.",
      icon: <Briefcase className="h-8 w-8" />
    }
  ], [])

  const nextReview = useCallback(() => {
    setCurrentReview((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prevReview = useCallback(() => {
    setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

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
  return (
    <div className="relative isolate flex flex-col min-h-screen bg-obsidian text-ink">
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-obsidian via-obsidian to-[#11131a]" />
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-[url('/images/texture.png')] opacity-[.06]" />
      
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-obsidian/55 px-8 py-4 backdrop-blur-md">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/Finalaoniqqlogo.png"
            alt="Aoniqq Logo"
            width={400}
            height={400}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>
        <div className="flex items-center">
          <nav className="hidden gap-6 lg:flex">
            <a href="#services" onClick={handleNavClick} className="group relative text-[15px] font-medium text-ink transition-colors hover:text-white">
              Services
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-tealLux to-royal transition-all duration-300 group-hover:w-full"/>
            </a>
            <a href="#why-aoniqq" onClick={handleNavClick} className="group relative text-[15px] font-medium text-ink transition-colors hover:text-white">
              What Sets Us Apart
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-tealLux to-royal transition-all duration-300 group-hover:w-full"/>
            </a>
            <a href="#testimonials" onClick={handleNavClick} className="group relative text-[15px] font-medium text-ink transition-colors hover:text-white">
              Testimonials
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-tealLux to-royal transition-all duration-300 group-hover:w-full"/>
            </a>
            <a href="#contact" onClick={handleNavClick} className="group relative text-[15px] font-medium text-ink transition-colors hover:text-white">
              Contact
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-tealLux to-royal transition-all duration-300 group-hover:w-full"/>
            </a>
          </nav>
          <div className="hidden gap-3 lg:flex items-center ml-8">
            <Link href="/websitecreation" className="relative px-3 py-1.5 text-sm font-medium text-white transition">
              Website Development
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-gradient-to-r from-tealLux to-royal"/>
            </Link>
            <Link href="/speedtest" className="relative px-3 py-1.5 text-sm font-medium text-white transition">
              Website Speed Test
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-gradient-to-r from-tealLux to-royal"/>
            </Link>
            <Link href="/book" className="relative px-3 py-1.5 text-sm font-medium text-white transition">
              Book
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-gradient-to-r from-tealLux to-royal"/>
            </Link>
          </div>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden ml-4 border-white-_06">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-obsidian border-l border-white-_06">
              <nav className="flex flex-col gap-8 mt-12 font-sans">
                <a className="text-lg font-medium hover:text-white transition-colors" href="#services" onClick={handleNavClick}>
                  Services
                </a>
                <a className="text-lg font-medium hover:text-white transition-colors" href="#why-aoniqq" onClick={handleNavClick}>
                  What Sets Us Apart
                </a>
                <a className="text-lg font-medium hover:text-white transition-colors" href="#testimonials" onClick={handleNavClick}>
                  Testimonials
                </a>
                <a className="text-lg font-medium hover:text-white transition-colors" href="#contact" onClick={handleNavClick}>
                  Contact
                </a>
                <Link href="/websitecreation" passHref>
                  <HoverButton className="w-full">Website Development</HoverButton>
                </Link>
                <Link href="/speedtest" passHref>
                  <HoverButton className="w-full">Website Speed Test</HoverButton>
                </Link>
                <Link href="/book" passHref>
                  <HoverButton className="w-full">Book</HoverButton>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative isolate flex min-h-[92vh] flex-col items-center justify-center px-6 text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[520px] w-[520px] rounded-full bg-[rgba(36,84,255,.05)] blur-[120px]" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[url('/images/texture.png')] opacity-[.02] mix-blend-overlay" />
          <div className="pointer-events-none absolute top-1/2 left-[6%] h-[120vh] w-px -translate-y-1/2 scale-y-[0.95] bg-gradient-to-b from-transparent via-royal to-transparent opacity-5"></div>
          
          <div className="container mx-auto px-8 max-w-7xl z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
            
              <p className="mt-8 max-w-[55ch] text-[18px]/[1.65] text-[#c4c4c4]">
                At Aoniqq, we handle the technical side of projects so you can focus on what matters most — your business. Our personalized approach, clear communication, and industry expertise ensure your project is in capable hands, from start to finish.
              </p>
              <Link href="/book" passHref>
                <HoverButton className="mt-14">
                  Schedule a Free Consultation
                </HoverButton>
              </Link>
              <div className="mt-20 animate-fade-in-down [animation-delay:1s] [animation-duration:2s]">
                <a href="#services" onClick={handleNavClick}>
                  <svg className="w-8 h-8 text-mute/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-8 md:py-12 bg-transparent">
          <Timeline data={services} />
        </section>
        <section id="why-aoniqq" className="w-full py-16 md:py-24 bg-transparent">
          <div className="mx-auto max-w-6xl px-8">
            <h2 className="mb-16 text-center font-serif text-[46px] font-semibold tracking-[-.01em] text-white">
              What Sets Us Apart
            </h2>

            <div className="grid gap-12 md:grid-cols-2">
              {/* LEFT – pain points */}
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
                  Common Issues with Other Partners
                </h3>
                <ul className="space-y-5 text-[17px] leading-[1.55] text-mute font-sans">
                  {[
                    "Missed Deadlines, Delaying Deliveries",
                    "Poor Communication",
                    "Overpromising, Under-delivering",
                    "Needs to Be Micromanaged",
                    "Lack of Accountability",
                    "Low Quality Work",
                    "Hidden Costs",
                    "Unresponsive After Project Completion",
                    "Poor Attention to Detail",
                    "Generalized Solutions"
                  ].map((issue) => (
                    <li key={issue} className="flex items-start gap-3">
                      <AlertTriangle className="mt-[3px] h-4 w-4 flex-none text-[#ff3b3b]/70" aria-hidden="true" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>

              {/* RIGHT – solutions */}
              <motion.article 
                className="relative overflow-hidden rounded-2xl bg-[rgba(36,84,255,.08)] backdrop-blur-md p-10 ring-1 ring-inset ring-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .45, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-tealLux/30 blur-[4px]" />
                <span className="pointer-events-none absolute -top-10 left-0 h-20 w-[150%] rotate-4 bg-[rgba(36,84,255,.08)]" />
                <h3 className="text-2xl font-serif font-semibold -tracking-wide mb-8 text-white text-center">Aoniqq&apos;s Approach</h3>
                <ul className="space-y-5 text-[17px] leading-[1.55] text-ink font-sans">
                  {[
                    "Guaranteed On-Time Delivery",
                    "Clear & Consistent Communication and Explanation",
                    "Realistic Expectations",
                    "Hands Off Client Approach",
                    "Full Accountability",
                    "Refund-Backed Quality Assurance",
                    "Transparent Pricing",
                    "Ongoing Support",
                    "Full Customization",
                    "Tailored to Your Business Needs"
                  ].map((gain) => (
                    <li key={gain} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-[3px] h-4 w-4 flex-none text-tealLux" aria-hidden="true" />
                      <span>{gain}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </div>
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
        <section id="contact" className="w-full py-16 md:py-24 bg-transparent">
          <div className="container mx-auto px-8 max-w-6xl">
            <div className="flex flex-col items-center space-y-8 text-center">
              <h2 className="text-5xl font-serif font-bold -tracking-wider text-white">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[700px] md:text-xl text-ink font-sans leading-relaxed">
                Let&apos;s discuss your project and see how we can help you achieve your goals.
              </p>
              <Link href="/book" passHref>
                <HoverButton className="mt-14">
                  Schedule a Free Consultation
                </HoverButton>
              </Link>
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
    </div>
  )
}