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
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Terms of Service for Aoniqq.com</h1>
        <div className="space-y-6 text-gray-200">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">1. Acceptance of Terms</h2>
            <p>By accessing or using Aoniqq.com (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) and the services provided through this website, including but not limited to website development, project management, and other tech/business-related services (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you should not use the Services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">2. Modifications to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting the updated Terms on this page. Your continued use of the Services after such changes will constitute your acceptance of the new Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">3. Eligibility</h2>
            <p>To use the Services, you must be at least 18 years old and have the legal authority to enter into a binding contract. By using our Services, you confirm that you meet these eligibility requirements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">4. Services Provided</h2>
            <p>Aoniqq.com offers various tech and business-related services, including but not limited to website development, project management, and other consulting services. The specific scope of services will be outlined in individual agreements or contracts between the Company and the client.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">5. Payment Terms</h2>
            <p>You agree to pay for the Services as set forth in the applicable agreement or contract. Invoices will be issued in accordance with the agreed-upon payment schedule, and payments are due upon receipt unless otherwise stated. We reserve the right to suspend or terminate Services if payments are not made on time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">6. Intellectual Property</h2>
            <p>All content, trademarks, service marks, logos, and other intellectual property used or displayed on the website or through the Services are the property of Aoniqq.com or its licensors. You may not use, copy, reproduce, or distribute any of our intellectual property without our prior written consent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">7. Confidentiality</h2>
            <p>We agree to treat all confidential information provided by you in connection with the Services as strictly confidential. Similarly, you agree not to disclose any confidential information related to Aoniqq.com, its business, or its Services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">8. Termination</h2>
            <p>Either party may terminate the relationship at any time upon written notice. Upon termination, any outstanding payments will become due, and Aoniqq.com may suspend access to any ongoing or incomplete work.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Aoniqq.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from the use or inability to use the Services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">10. Disclaimer of Warranties</h2>
            <p>The Services are provided &quot;as is&quot; without any warranties of any kind, either express or implied. We do not guarantee that the Services will be uninterrupted or error-free, nor do we guarantee the results of using the Services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">11. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the state of Delaware, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">12. Dispute Resolution</h2>
            <p>Any disputes arising from these Terms or the Services provided by Aoniqq.com shall be resolved through arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Wilmington, Delaware, and the decision of the arbitrator shall be binding.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-300">13. Entire Agreement</h2>
            <p>These Terms, along with any other agreements or contracts entered into between you and Aoniqq.com, constitute the entire agreement between the parties.</p>
          </section>
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">©2025 Aoniqq LLC. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-gray-200">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}