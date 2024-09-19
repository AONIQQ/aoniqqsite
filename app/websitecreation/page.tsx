'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import WebsiteJourneyMap from './website-journey-map'
import PricingSlider from './PricingSlider'
import Portfolio from './Portfolio'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar, ChevronRight, ChevronLeft, Menu, X, Star, ArrowRight, DollarSign, CheckCircle2, AlertTriangle } from "lucide-react"
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export default function WebsiteCreation() {
  const [currentReview, setCurrentReview] = useState(0)
  const [expandedReviews, setExpandedReviews] = useState<boolean[]>(Array(5).fill(false))
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const reviews = [
    {
      text: "I have had the pleasure of working with Andrew, the founder of Aoniqq, on multiple Web3 and Web2 projects for over a year now. Throughout our collaborations, Andrew has consistently demonstrated competence, trustworthiness, professionalism, discipline, punctuality, open-mindedness, quick learning ability, and excellent problem-solving skills. His extensive experience is further bolstered by his ability to know when to delegate or call in experts to fill any gaps. In challenging situations, Andrew has shown his ability to perform under pressure and in harsh conditions without slipping up. His technical expertise combined with his ability to work with and manage a team of developers makes him a great resource. For the sake of providing a more specific and helpful review, I'd like to share one of my recent positive experiences with Aoniqq. Aoniqq single-handedly saved a Web3 project launch that was being severely mismanaged by a team of supposedly professional developers. The other developers not only failed to do their job correctly but were also an absolute nightmare to work with when corrections were needed. Aoniqq solved the technical issues while also successfully navigating the complicated communication issues with the original dev team to ensure that they provided what was needed for the corrections to be completed. I felt safe trusting Aoniqq to take charge of the process, and they executed flawlessly, leading to a smooth launch for the project. Being able to trust Aoniqq to handle the development side of a project completely allows my team and me to focus our energy on our areas of specialization, opening us up to the most success and growth possible. The peace of mind provided by such confident delegation is priceless. If anyone requires further validation of any claims or would like to learn more about the quality of work I've seen from Andrew and Aoniqq, I would be happy to serve as a reference.",
      author: "Ryan | Founder | Pylon Enterprises"
    },
    {
      text: "Aoniqq is a lifesaver.  After spending 6 months spinning my wheels with another developer, I brought in Andrew from Aoniqq and he accomplished more in our first meeting than had been done in the previous 6 months.  He's been great, building an entire custom website for me to get me exactly the functionality I needed while also fixing all the weird issues that came up while we had been trying to use Webflow.  It's what I want without compromises, and looks better.  I'm even saving money on hosting his tailor-made build compared to the cost of an endless subscription to Webflow or another competitor.  Just considering the final product, Aoniqq is absolutely the way to go.\nFactoring in Andrew's excellent communication, professionalism, cleverness, flexibility, and discipline, I can't recommend Andrew and Aoniqq enough.  His ability to understand and implement 'bleeding-edge' web development tools has also been a huge help.  When I've asked if we need to add a feature, he's always clear about how he would go about it and what the pros and cons would be, allowing me to make a decision based on the final product.  Aoniqq is an excellent service.  When you compare it to other website development services, Aoniqq is truly exceptional.\nI've been recommending Aoniqq to friends and business contacts since I first worked with Andrew and will happily continue to do so.",
      author: "Rob | Founder | Remotetutoring.com"
    },
    {
      text: "Aoniqq was fantastic to work with. They quickly understood the task and delivered a stunning website for my business faster than expected and within my budget. The site is user-friendly and visually appealing, and resonates well with my customers and brand. Communication was seamless, and they were always responsive and professional. Highly recommend Aoniqq for any development needs, and I look forward to working with them again in the future.",
      author: "Steven | CEO | Market Vision"
    },
    {
      text: "I recently had the pleasure of working with Aoniqq on a project and was extremely impressed with their expertise. Their team of developers were not only highly skilled, but also very responsive and efficient in meeting deadlines. One of the things I appreciated most about Aoniqq was their ability to understand our business, and provide tailored solutions based on this information. I highly recommend Aoniqq for anyone in need of the services they offer. Their attention to detail, expertise, and customer service is top-notch. Aoniqq truly exceeded our expectations and we will not hesitate to recommend them and work with them in the future.",
      author: "Josh | CEO | Express Solutions"
    },
    {
      text: "Our Design assets and our website were delivered ahead of schedule, and exceeded our expectations. We were able to be truly hands off throughout the process, which was extremely valuable, as we are already extremely busy. After discussing the project with the Aoniqq team and seeing their attention to detail, we knew we had made the right decision. In past projects of ours, web development has been a huge headache because of the necessity to micromanage developers. This was not the case with Aoniqq, which made working with them a breath of fresh air.",
      author: "Fastrack Team | Fastrack EDU LLC"
    },
    {
      text: "After months of working with Aoniqq, I can say without pause, that they are one of the most reliable service providers with whom we have worked. What started with a small project has blossomed into Aoniqq providing oversight of our team, project management, and development. They have taken on the increased scope professionally. They have taken the initiative to research new trends as they emerge in the space. And, they have properly -and timely! - communicated things along the way. We consider Aoniqq to be a true partner in the project.",
      author: "Justin | Founder | Bodega Blocks"
    },
    {
      text: "Aoniqq was recommended to the team by an advisor helping out on the project after we had issues with our previous development team. The level of professionalism we received from the team at Aoniqq was something we hadn't experienced before, and it came at the perfect time. Their team was actively engaged in the whole process and their technical knowledge from start to finish allowed us to focus on the growth of the project.",
      author: "Alex | Founder | All For One"
    },
    {
      text: "The team at Aoniqq designed and created a feature rich website for our project. Andrew from the team came to every meeting and had excellent ideas. Despite changing direction multiple times as the project developed, their team never complained, and their team didn't flinch when the work doubled and then tripled. Highly professional, and especially trustworthy team. Can't wait to work together in the future.",
      author: "Max | CEO | Unreal Assets"
    }
  ]

  const nextReview = useCallback(() => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }, [reviews.length])

  const prevReview = useCallback(() => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }, [reviews.length])

  const toggleExpandReview = (index: number) => {
    setExpandedReviews(prev => {
      const newExpanded = [...prev]
      newExpanded[index] = !newExpanded[index]
      return newExpanded
    })
  }

  const truncateText = (text: string, sentences: number) => {
    const sentenceArray = text.match(/[^.!?]+[.!?]+/g) || []
    return sentenceArray.slice(0, sentences).join(' ')
  }

  const openContactForm = useCallback(() => {
    setIsContactFormOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeContactForm = useCallback(() => {
    setIsContactFormOpen(false)
    document.body.style.overflow = 'auto'
  }, [])

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const href = event.currentTarget.getAttribute('href')
    if (href) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#000033] to-[#000066] text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" passHref legacyBehavior>
          <motion.a 
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
          </motion.a>
        </Link>
        <nav className="hidden md:flex gap-4 sm:gap-6">
        <Link href="/speedtest" className="text-sm font-medium hover:text-blue-400 transition-colors mr-4">
                Website Speed Test
            </Link>
          {['Portfolio', 'Why Aoniqq', 'Testimonials', 'Pricing', 'Contact',].map((item, index) => (
            <motion.a
              key={item}
              className="text-sm font-medium hover:text-blue-400 transition-colors"
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              onClick={handleNavClick}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#000033] border-l border-blue-400/20">
            <nav className="flex flex-col gap-4 mt-8">
              {['Portfolio', 'Why Aoniqq', 'Testimonials', 'Pricing', 'Contact', 'Website Speed Test'].map((item, index) => (
                <motion.a
                  key={item}
                  className="text-lg font-medium hover:text-blue-400 transition-colors"
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col items-center space-y-6 text-center">
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Get a Fast, Functional, and Fully Customized Website
                <br />
                <span style={{ color: '#3337f2' }}>Tailored to Your Business</span>
              </motion.h1>
              <motion.p 
                className="mx-auto max-w-[1000px] text-gray-300 text-lg lg:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Don&apos;t waste valuable time and money on low quality design, poor communication, and long turnaround times. Get a thoughtfully designed website that is optimized for conversions and sales, without having to spend precious time on the development process.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xl py-6 px-10 mt-6 animate-pulse" 
                  onClick={openContactForm}
                >
                  Submit Inquiry
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Why Aoniqq Section */}
        <section id="why-aoniqq" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 animate-gradient-y"></div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              What Sets Aoniqq Apart from other Website Development Services
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                className="bg-gradient-to-br from-red-900/30 to-red-700/30 p-6 rounded-lg border-2 border-red-400/50 hover:border-red-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-red-400 text-center">Common Issues with Other Website Developers</h3>
                <ul className="space-y-2 text-center">
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
                  ].map((issue, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center justify-center space-x-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AlertTriangle className="text-red-400 h-5 w-5 flex-shrink-0" />
                      <span>{issue}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-green-900/30 to-green-700/30 p-6 rounded-lg border-2 border-green-400/50 hover:border-green-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-green-400 text-center">Aoniqq&apos;s Approach</h3>
                <ul className="space-y-2 text-center">
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
                  ].map((approach, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center justify-center space-x-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="text-green-400 h-5 w-5 flex-shrink-0" />
                      <span>{approach}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <motion.div
              className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-6 rounded-lg border-2 border-blue-400/50 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl mt-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <WebsiteJourneyMap />
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-black/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient-x"></div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Some of Our Most Recent Portfolio Websites
            </motion.h2>
            <Portfolio />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-black/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Client Reviews
            </motion.h2>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden px-4 md:px-12"
                >
                  <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 text-white border-2 border-blue-400/50 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    <CardContent className="p-6 relative">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="max-h-[300px] overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                        <p className="text-lg leading-relaxed">
                          {expandedReviews[currentReview] 
                            ? reviews[currentReview].text 
                            : truncateText(reviews[currentReview].text, 3)}
                        </p>
                      </div>
                      {reviews[currentReview].text.length > truncateText(reviews[currentReview].text, 3).length && (
                          <Button
                          onClick={() => toggleExpandReview(currentReview)}
                          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {expandedReviews[currentReview] ? 'Read Less' : 'Read More'}
                        </Button>
                      )}
                      <p className="font-bold text-blue-400 mt-4 text-right">{reviews[currentReview].author}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
              <Button 
                className="absolute left-0 md:-left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                onClick={prevReview}
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Previous review</span>
              </Button>
              <Button 
                className="absolute right-0 md:-right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                onClick={nextReview}
              >
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Next review</span>
              </Button>
            </div>
            <div className="flex justify-center mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                    index === currentReview ? 'bg-blue-400 scale-125' : 'bg-gray-400 hover:bg-blue-300'
                  }`}
                  onClick={() => setCurrentReview(index)}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-black/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2
              className="text-4xl font-bold mb-4 text-center leading-relaxed pb-2" // Added leading-relaxed and pb-2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Pricing
            </motion.h2>
            <PricingSlider openContactForm={openContactForm} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-900/40 to-purple-900/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Contact Us
              </motion.h2>
              <motion.p 
                className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Get in touch with us to discuss your project needs via email, text, call, or by submitting the form below.
              </motion.p>
              <motion.div 
                className="space-y-2 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p>1007 N Orange St</p>
                <p>Wilmington, DE, 19801</p>
                <p>info@aoniqq.com</p>
                <p>605-884-6550</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xl py-6 px-10 mt-6 animate-pulse" 
                  onClick={openContactForm}
                >
                  Submit Inquiry
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">© 2024 Aoniqq LLC. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-gray-200">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-gray-200">
            Privacy
          </Link>
        </nav>
      </footer>
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-gradient-to-br from-blue-900 to-purple-900 p-8 rounded-lg max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              <Button 
                onClick={closeContactForm} 
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <ContactForm isOpen={isContactFormOpen} onClose={closeContactForm} redirectUrl="/" />
          </motion.div>
        </div>
      )}
    </div>
  )
}