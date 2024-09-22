'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, X } from 'lucide-react'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const href = event.currentTarget.getAttribute('href')
    if (href) {
      window.location.href = href
    }
    setIsMenuOpen(false)
  }

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
                  href={`/#${item.toLowerCase().replace(' ', '-')}`}
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

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Privacy Policy for Aoniqq.com</h1>
        <div className="space-y-6 text-gray-200">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">1. Introduction</h2>
            <p>This Privacy Policy explains how Aoniqq.com (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, discloses, and protects your personal information when you use our website and Services. By using Aoniqq.com, you consent to the practices described in this Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">2. Information We Collect</h2>
            <p>We collect personal information that you provide directly to us, including but not limited to:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing information</li>
              <li>Other information necessary to provide the Services</li>
            </ul>
            <p className="mt-2">We may also collect certain information automatically when you visit our website, such as your IP address, browser type, operating system, and browsing history.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">3. How We Use Your Information</h2>
            <p>We use the personal information we collect for the following purposes:</p>
            <ul className="list-disc list-inside ml-4">
              <li>To provide, operate, and maintain our Services</li>
              <li>To process transactions and manage your account</li>
              <li>To communicate with you regarding the Services</li>
              <li>To improve our website and Services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">4. How We Share Your Information</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following cases:</p>
            <ul className="list-disc list-inside ml-4">
              <li>With service providers who assist in the operation of our website and Services (e.g., payment processors, hosting services)</li>
              <li>To comply with legal obligations, such as responding to subpoenas, court orders, or regulatory requests</li>
              <li>To protect the rights, property, or safety of Aoniqq.com, our customers, or others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">5. Data Retention</h2>
            <p>We will retain your personal information for as long as necessary to fulfill the purposes for which it was collected or as required by applicable laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">6. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee its absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">7. Cookies</h2>
            <p>We use cookies to enhance your experience on our website. Cookies are small data files stored on your device that help us understand how you use the website and improve your experience. You can manage or disable cookies through your browser settings, but please note that disabling cookies may affect the functionality of the website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">8. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites, and we encourage you to review their privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">9. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request the correction or deletion of your personal information</li>
              <li>Object to or restrict the processing of your personal information</li>
              <li>Withdraw your consent to the processing of your personal information</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, please contact us at info@aoniqq.com.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">10. Children&apos;s Privacy</h2>
            <p>Our Services are not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete such information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">11. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. Your continued use of the Services after any changes indicates your acceptance of the new Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at info@aoniqq.com.</p>
          </section>
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">© 2024 Aoniqq LLC. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/tos" className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-gray-200">
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  )
}