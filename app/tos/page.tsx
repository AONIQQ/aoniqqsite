'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AoniqqLogo from '/public/images/Finalaoniqqlogo.png';

export default function Component() {
  return (
    <div className="relative isolate flex flex-col min-h-screen bg-obsidian text-ink">
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-obsidian via-obsidian to-[#11131a]" />
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-[url('/images/texture.png')] opacity-[.06]" />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-center bg-obsidian/55 px-8 py-3 backdrop-blur-md">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={AoniqqLogo}
            alt="Aoniqq Logo"
            width={400}
            height={400}
            className="w-40 h-20 object-contain"
            priority
          />
        </Link>
      </header>

      <main className="container mx-auto px-8 py-32 font-sans">
        <h1 className="text-5xl font-serif font-bold -tracking-wider text-center mb-12 text-white">Terms of Service</h1>
        <div className="prose prose-invert max-w-4xl mx-auto text-ink prose-p:text-ink prose-headings:text-white prose-strong:text-white prose-a:text-royal hover:prose-a:text-royal2">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using Aoniqq.com (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) and the services provided through this website, including but not limited to website development, project management, and other tech/business-related services (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you should not use the Services.</p>

            <h2>2. Modifications to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting the updated Terms on this page. Your continued use of the Services after such changes will constitute your acceptance of the new Terms.</p>
            
            <h2>3. Eligibility</h2>
            <p>To use the Services, you must be at least 18 years old and have the legal authority to enter into a binding contract. By using our Services, you confirm that you meet these eligibility requirements.</p>
            
            <h2>4. Services Provided</h2>
            <p>Aoniqq.com offers various tech and business-related services, including but not limited to website development, project management, and other consulting services. The specific scope of services will be outlined in individual agreements or contracts between the Company and the client.</p>
            
            <h2>5. Payment Terms</h2>
            <p>You agree to pay for the Services as set forth in the applicable agreement or contract. Invoices will be issued in accordance with the agreed-upon payment schedule, and payments are due upon receipt unless otherwise stated. We reserve the right to suspend or terminate Services if payments are not made on time.</p>
            
            <h2>6. Intellectual Property</h2>
            <p>All content, trademarks, service marks, logos, and other intellectual property used or displayed on the website or through the Services are the property of Aoniqq.com or its licensors. You may not use, copy, reproduce, or distribute any of our intellectual property without our prior written consent.</p>
            
            <h2>7. Confidentiality</h2>
            <p>We agree to treat all confidential information provided by you in connection with the Services as strictly confidential. Similarly, you agree not to disclose any confidential information related to Aoniqq.com, its business, or its Services.</p>
            
            <h2>8. Termination</h2>
            <p>Either party may terminate the relationship at any time upon written notice. Upon termination, any outstanding payments will become due, and Aoniqq.com may suspend access to any ongoing or incomplete work.</p>
            
            <h2>9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Aoniqq.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from the use or inability to use the Services.</p>
            
            <h2>10. Disclaimer of Warranties</h2>
            <p>The Services are provided &quot;as is&quot; without any warranties of any kind, either express or implied. We do not guarantee that the Services will be uninterrupted or error-free, nor do we guarantee the results of using the Services.</p>
            
            <h2>11. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the state of Delaware, without regard to its conflict of law provisions.</p>
            
            <h2>12. Dispute Resolution</h2>
            <p>Any disputes arising from these Terms or the Services provided by Aoniqq.com shall be resolved through arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Wilmington, Delaware, and the decision of the arbitrator shall be binding.</p>
            
            <h2>13. Entire Agreement</h2>
            <p>These Terms, along with any other agreements or contracts entered into between you and Aoniqq.com, constitute the entire agreement between the parties.</p>
        </div>
      </main>

      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-8 md:px-12 border-t border-white-_06 font-sans">
        <div className="flex-shrink-0">
          <Image
            src={AoniqqLogo}
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