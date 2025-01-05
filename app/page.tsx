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

export default function Component() {
  const [currentReview, setCurrentReview] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeWhySection, setActiveWhySection] = useState(1)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [expandedReviews, setExpandedReviews] = useState<boolean[]>(Array(8).fill(false))

  const reviews = useMemo(() => [
    {
      text: "I have had the pleasure of working with Andrew, the founder of Aoniqq, on multiple Web3 and Web2 projects for over a year now. Throughout our collaborations, Andrew has consistently demonstrated competence, trustworthiness, professionalism, discipline, punctuality, open-mindedness, quick learning ability, and excellent problem-solving skills. His extensive experience is further bolstered by his ability to know when to delegate or call in experts to fill any gaps. In challenging situations, Andrew has shown his ability to perform under pressure and in harsh conditions without slipping up. His technical expertise combined with his ability to work with and manage a team of developers makes him a great resource. For the sake of providing a more specific and helpful review, I'd like to share one of my recent positive experiences with Aoniqq. Aoniqq single-handedly saved a Web3 project launch that was being severely mismanaged by a team of supposedly professional developers. The other developers not only failed to do their job correctly but were also an absolute nightmare to work with when corrections were needed. Aoniqq solved the technical issues while also successfully navigating the complicated communication issues with the original dev team to ensure that they provided what was needed for the corrections to be completed. I felt safe trusting Aoniqq to take charge of the process, and they executed flawlessly, leading to a smooth launch for the project. Being able to trust Aoniqq to handle the development side of a project completely allows my team and me to focus our energy on our areas of specialization, opening us up to the most success and growth possible. The peace of mind provided by such confident delegation is priceless. If anyone requires further validation of any claims or would like to learn more about the quality of work I've seen from Andrew and Aoniqq, I would be happy to serve as a reference.",
      author: "Ryan | Founder | Pylon Enterprises"
    },
    {
      text: "Aoniqq is a lifesaver.  After spending 6 months spinning my wheels with another developer, I brought in Andrew from Aoniqq and he accomplished more in our first meeting than had been done in the previous 6 months.  He's been great, building an entire custom website for me to get me exactly the functionality I needed while also fixing all the weird issues that came up while we had been trying to use Webflow.  It's what I want without compromises, and looks better.  I'm even saving money on hosting his tailor-made build compared to the cost of an endless subscription to Webflow or another competitor.  Just considering the final product, Aoniqq is absolutely the way to go.\nFactoring in Andrew's excellent communication, professionalism, cleverness, flexibility, and discipline, I can't recommend Andrew and Aoniqq enough.  His ability to understand and implement 'bleeding-edge' web development tools has also been a huge help.  When I've asked if we need to add a feature, he's always clear about how he would go about it and what the pros and cons would be, allowing me to make a decision based on the final product.  Aoniqq is an excellent service.  When you compare it to other website development services, Aoniqq is truly exceptional.\nI've been recommending Aoniqq to friends and business contacts since I first worked with Andrew and will happily continue to do so.",
      author: "Rob | Founder | Remotetutoring.com"
    },
    {
      text: "Andrew was recommended to assist in the development of the website for our organization. I did not know him or have any experience in designing a website. We desired to have the first features in place by August 12, 2024. Andrew got it done. Phase II required greater effort and periodic revisions as we refined our objectives. Features that we envisioned but did not know how to implement were easily effectuated by Andrew. Tasks first outlined on Friday were accomplished over the weekend. Andrew has been a pleasure to work with.",
      author: "Albert | Treasurer | DPE Foundation for Foreign Service Education"
    },
    {
      text: "I recently had the pleasure of working with Aoniqq on a project and was extremely impressed with their expertise. Their team of developers were not only highly skilled, but also very responsive and efficient in meeting deadlines. One of the things I appreciated most about Aoniqq was their ability to understand our business, and provide tailored solutions based on this information. I highly recommend Aoniqq for anyone in need of the services they offer. Their attention to detail, expertise, and customer service is top-notch. Aoniqq truly exceeded our expectations and we will not hesitate to recommend them and work with them in the future.",
      author: "Josh | CEO | Express Solutions"
    },
    {
      text: "After discussing our plans with the Aoniqq team and asking them more about how they can help fill a gap we had, we were extremely impressed. Their ability to understand our complex business and explain things in a way that was easy to understand enabled us to consider them a true partner, and is what led us to bring them on for ongoing project and strategy management.",
      author: "Fastrack Team | Fastrack EDU LLC"
    },
    {
      text: "After months of working with Aoniqq, I can say without pause, that they are one of the most reliable service providers with whom we have worked. What started with generative art coding services has blossomed into Aoniqq providing overall smart contract consulting and project management. They have taken on the increased scope professionally. They have taken the initiative to research new trends as they emerge in the space. And, they have properly -and timely! - communicated things along the way. We consider Aoniqq to be a true partner in the project.",
      author: "Justin | Founder | Bodega Blocks"
    },
    {
      text: "Aoniqq was fantastic to work with. They have been a great partner in the development of our website as well as various consulting and custom software development needs throughout the last few years. The team is professional, knowledgeable, and always willing to go above and beyond to ensure the project is successful. We look forward to continuing to work with them in the future.",
      author: "Steven | Founder | Wall Street Vision"
    },
    {
      text: "Aoniqq was recommended to the team by an advisor helping out on the project after we had issues with our previous development team. The level of professionalism we received from the team at Aoniqq was something we haven't experienced in web3 before, and it came at the perfect time. Their team was actively engaged in the whole process and their technical knowledge from start to finish allowed us to focus on the growth of the project.",
      author: "Alex | Founder | All For One"
    },
    {
      text: "The team at Aoniqq helped us program all of the contracts and code for our NFT drop and much much more. Andrew from the team came to every meeting and had excellent ideas. Despite changing direction multiple times as the project developed, their team never complained, and their team didn't flinch when the work doubled and then tripled. Highly professional, and especially trustworthy team. Can't wait to work together in the future.",
      author: "Max | CEO | Unreal Assets"
    }
  ], [])

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
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }, [reviews.length])

  const prevReview = useCallback(() => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }, [reviews.length])

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#000033] to-[#000066] text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/LargeSideLogo.png"
            alt="Aoniqq Logo"
            width={144}
            height={48}
            className="w-36 h-12 object-contain"
            priority
          />
        </Link>
        <div className="flex items-center">
          <nav className="hidden xl:flex space-x-4">
            <a className="text-sm font-medium hover:text-blue-400 transition-colors whitespace-nowrap" href="#services" onClick={handleNavClick}>
              Services
            </a>
            <a className="text-sm font-medium hover:text-blue-400 transition-colors whitespace-nowrap" href="#why-aoniqq" onClick={handleNavClick}>
              What Sets Us Apart
            </a>
            <a className="text-sm font-medium hover:text-blue-400 transition-colors whitespace-nowrap" href="#testimonials" onClick={handleNavClick}>
              Testimonials
            </a>
            <a className="text-sm font-medium hover:text-blue-400 transition-colors whitespace-nowrap" href="#contact" onClick={handleNavClick}>
              Contact
            </a>
          </nav>
          <div className="hidden xl:flex items-center ml-4 space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/websitecreation">Website Development</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/speedtest">Website Speed Test</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/book">Book</Link>
            </Button>
          </div>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#000033] border-l border-blue-400/20">
              <nav className="flex flex-col gap-4 mt-8">
                <a className="text-lg font-medium hover:text-blue-400 transition-colors" href="#services" onClick={handleNavClick}>
                  Services
                </a>
                <a className="text-lg font-medium hover:text-blue-400 transition-colors" href="#why-aoniqq" onClick={handleNavClick}>
                  What Sets Us Apart
                </a>
                <a className="text-lg font-medium hover:text-blue-400 transition-colors" href="#testimonials" onClick={handleNavClick}>
                  Testimonials
                </a>
                <a className="text-lg font-medium hover:text-blue-400 transition-colors" href="#contact" onClick={handleNavClick}>
                  Contact
                </a>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/websitecreation">Website Development</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/speedtest">Website Speed Test</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/book">Book</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Welcome to <span style={{ color: '#3337f2' }}>Aoniqq</span>
                </h1>
              </div>
              <p className="mx-auto max-w-[1000px] text-gray-300 text-lg lg:text-xl">
                At Aoniqq, we handle the technical side so you can focus on what matters most — your business. Our personalized approach, clear communication, and industry expertise ensure your project is in capable hands, from start to finish.
              </p>
              <Link href="/book" passHref>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xl py-6 px-10 mt-6 animate-pulse">
                  Schedule a Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-black/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient-x"></div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Our Core Services</h2>
            <p className="text-center text-gray-300 mb-8">Kindly initiate contact to detail your requirements, and we will evaluate our capacity to assist you.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Code className="h-12 w-12 mb-4 text-blue-400" />, title: "Full Stack Development", description: "We have built the technical aspects of projects in different industries from the ground up. We are constantly researching and learning new technologies to provide the most effective solutions. We've built everything from software as a service (SaaS) products, full scale custom applications and dashboards, algorithm systems, AI integration tools, to complex smart contract systems and more. Our focus is on balancing the fastest, most secure, and most scalable solutions with cost-effectiveness." },
                { icon: <Briefcase className="h-12 w-12 mb-4 text-blue-400" />, title: "Website Development", description: "We have a rich history in creating fast, responsive, and aesthetic websites for massive corporations, ecommerce brands, service professionals, startups, foundations, politicians, local businesses, and many others. Our core offer is centered around our ability to create a website that is tailored to your needs, without the headache of a long development process, or having to micromanage every aspect of the project. We have a deep knowledge of effective copywriting and SEO, to ensure your website is not only aesthetically pleasing, but also effective in achieving your business goals." },
                { icon: <Calendar className="h-12 w-12 mb-4 text-blue-400" />, title: "Project Management and Consulting", description: "Our constant pursuit of new information and trends, as well as our track record of success in multiple industries, makes us an excellent resource to provide consultation on, or manage your project. We have experience in managing projects of all sizes from scaling small business operations, to startup launches, to massive corporate projects. Using our diverse knowledge base, we are able to provide a comprehensive approach towards complex problems and roadblocks that businesses from a variety of sectors are facing." }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 text-white border-2 border-blue-400/50 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl h-full overflow-hidden">
                    <CardContent className="flex flex-col items-center p-6 h-full relative">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredService === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="relative z-10">
                        {service.icon}
                        <h3 className="text-xl font-bold mb-2 text-center">{service.title}</h3>
                        <p className="text-center text-gray-300 mt-2">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {service.description}
                          </motion.span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/book" passHref>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xl py-6 px-10 animate-bounce">
                  Schedule a Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="why-aoniqq" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 animate-gradient-y"></div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">What Sets Aoniqq Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                className="bg-gradient-to-br from-red-900/30 to-red-700/30 p-6 rounded-lg border-2 border-red-400/50 hover:border-red-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-red-400 text-center">Common Issues with Other Developers</h3>
                <ul className="space-y-2 text-center">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {whySections.map((section, index) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer p-6 rounded-lg ${activeWhySection === index ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-blue-900/20'} transition-all duration-300 border-2 ${activeWhySection === index ? 'border-blue-400' : 'border-blue-400/20'}`}
                  onClick={() => setActiveWhySection(index)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">{section.title}</h3>
                </motion.div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWhySection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-6 rounded-lg shadow-2xl backdrop-blur-sm border-2 border-blue-400/50"
              >
                <p className="text-lg text-center">{whySections[activeWhySection].content}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-black/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Client Reviews</h2>
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
                      <Quote className="absolute top-4 left-4 w-8 h-8 text-blue-400 opacity-50" />
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
                        {reviews[currentReview].text.length > truncateText(reviews[currentReview].text, 3).length && (
                          <Button
                            onClick={() => toggleExpandReview(currentReview)}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            {expandedReviews[currentReview] ? 'Read Less' : 'Read More'}
                          </Button>
                        )}
                      </div>
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
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-900/40 to-purple-900/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Let&apos;s discuss your project and see how we can help you achieve your goals.
              </p>
              <Link href="/book" passHref>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xl py-6 px-10 mt-6 animate-pulse">
                  Schedule a Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-400/20">
        <p className="text-xs text-gray-400">©2025 Aoniqq LLC. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/tos" className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-gray-200">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-gray-200">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}