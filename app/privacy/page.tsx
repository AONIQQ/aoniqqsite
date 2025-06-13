'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Component() {
  return (
    <div className="relative isolate flex flex-col min-h-screen bg-obsidian text-ink">
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-obsidian via-obsidian to-[#11131a]" />
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-[url('/images/texture.png')] opacity-[.06]" />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-center bg-obsidian/55 px-8 py-3 backdrop-blur-md">
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
      </header>

      <main className="container mx-auto px-8 py-32 font-sans">
        <h1 className="text-5xl font-serif font-bold -tracking-wider text-center mb-12 text-white">Privacy Policy</h1>
        <div className="prose prose-invert max-w-4xl mx-auto text-ink prose-p:text-ink prose-headings:text-white prose-strong:text-white prose-a:text-royal hover:prose-a:text-royal2">
            <h2>1. Introduction</h2>
            <p>This Privacy Policy explains how Aoniqq.com (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, discloses, and protects your personal information when you use our website and Services. By using Aoniqq.com, you consent to the practices described in this Privacy Policy.</p>

            <h2>2. Information We Collect</h2>
            <p>We collect personal information that you provide directly to us, including but not limited to:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing information</li>
              <li>Other information necessary to provide the Services</li>
            </ul>
            <p>We may also collect certain information automatically when you visit our website, such as your IP address, browser type, operating system, and browsing history.</p>
            
            <h2>3. How We Use Your Information</h2>
            <p>We use the personal information we collect for the following purposes:</p>
            <ul>
              <li>To provide, operate, and maintain our Services</li>
              <li>To process transactions and manage your account</li>
              <li>To communicate with you regarding the Services</li>
              <li>To improve our website and Services</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h2>4. How We Share Your Information</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following cases:</p>
            <ul>
              <li>With service providers who assist in the operation of our website and Services (e.g., payment processors, hosting services)</li>
              <li>To comply with legal obligations, such as responding to subpoenas, court orders, or regulatory requests</li>
              <li>To protect the rights, property, or safety of Aoniqq.com, our customers, or others</li>
            </ul>
            
            <h2>5. Data Retention</h2>
            <p>We will retain your personal information for as long as necessary to fulfill the purposes for which it was collected or as required by applicable laws.</p>
            
            <h2>6. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee its absolute security.</p>
            
            <h2>7. Cookies</h2>
            <p>We use cookies to enhance your experience on our website. Cookies are small data files stored on your device that help us understand how you use the website and improve your experience. You can manage or disable cookies through your browser settings, but please note that disabling cookies may affect the functionality of the website.</p>
            
            <h2>8. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites, and we encourage you to review their privacy policies.</p>
            
            <h2>9. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request the correction or deletion of your personal information</li>
              <li>Object to or restrict the processing of your personal information</li>
              <li>Withdraw your consent to the processing of your personal information</li>
            </ul>
            <p>To exercise any of these rights, please contact us at info@aoniqq.com.</p>
            
            <h2>10. Children&apos;s Privacy</h2>
            <p>Our Services are not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete such information.</p>
            
            <h2>11. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. Your continued use of the Services after any changes indicates your acceptance of the new Privacy Policy.</p>
            
            <h2>12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at info@aoniqq.com.</p>
        </div>
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
    </div>
  )
}