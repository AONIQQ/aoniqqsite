'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Smartphone, Laptop, DollarSign, TrendingUp, Users, Menu, AlertTriangle, CheckCircle2, ArrowRight, Quote, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { GlassButton } from '@/components/ui/GlassButton'
import { HoverButton } from '@/components/ui/HoverButton'

interface PageSpeedResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  opportunities: Array<{ title: string; description: string }>;
}

const motionProps = {
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
};

const ScoreIndicator = ({ value, label }: { value: number; label: string }) => {
  const getColor = (score: number) => {
    if (score >= 90) return '#2454FF'; // royal
    if (score >= 50) return '#0ABF8E'; // tealLux
    return '#ff3b3b'; // red-like
  };

  const color = getColor(value);

  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      {...motionProps}
    >
      <div 
        className="font-mono w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold border-4 shadow-lg" 
        style={{ borderColor: color, color: color, background: `linear-gradient(135deg, ${color}22, ${color}44)` }}
      >
        {value}
      </div>
      <span className="font-sans mt-2 text-sm font-medium text-mute">{label}</span>
    </motion.div>
  );
};

const Speedtest = () => {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [device, setDevice] = useState('desktop')
  const [results, setResults] = useState<{ desktop: PageSpeedResult | null; mobile: PageSpeedResult | null }>({
    desktop: null,
    mobile: null
  })
  const [error, setError] = useState<{ desktop: string | null; mobile: string | null }>({
    desktop: null,
    mobile: null
  })
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState('')
  const [showFullReportDialog, setShowFullReportDialog] = useState(false)
  const [fullReportForm, setFullReportForm] = useState({ name: '', email: '', phone: '' })
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState({ name: '', email: '', phone: '' })
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    if (loading) {
      const steps = [
        `Checking website performance for ${url}...`,
        `Checking Accessibility for ${url}...`,
        `Checking Best Practices for ${url}...`,
        `Almost Done with ${url}...`,
        `Checking SEO for ${url}...`,
        `Generating report for ${url}...`
      ]
      let step = 0
      const interval = setInterval(() => {
        if (step < steps.length) {
          setProgress(Math.min((step + 1) * (100 / steps.length), 95))
          setProgressText(steps[step])
          step++
        } else {
          clearInterval(interval)
        }
      }, 2000)

      const progressTimer = setTimeout(() => {
        setProgress(95)
      }, 7000)

      return () => {
        clearInterval(interval)
        clearTimeout(progressTimer)
      }
    }
  }, [loading, url])

  const parseResults = (json: any): PageSpeedResult => {
    if (!json || !json.lighthouseResult || !json.lighthouseResult.categories) {
      throw new Error("Invalid API response structure");
    }

    const categories = json.lighthouseResult.categories;
    const audits = json.lighthouseResult.audits;

    return {
      performance: categories.performance ? Math.round(categories.performance.score * 100) : 0,
      accessibility: categories.accessibility ? Math.round(categories.accessibility.score * 100) : 0,
      bestPractices: categories['best-practices'] ? Math.round(categories['best-practices'].score * 100) : 0,
      seo: categories.seo ? Math.round(categories.seo.score * 100) : 0,
      opportunities: Object.values(audits || {})
        .filter((audit: any) => 
          audit.score !== null && 
          audit.score < 1 && 
          (audit.details?.type === 'opportunity' || audit.details?.type === 'table')
        )
        .map((audit: any) => ({ title: audit.title, description: audit.description }))
    };
  }

  const formatUrl = (inputUrl: string): string => {
    let formattedUrl = inputUrl.trim().toLowerCase();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    return formattedUrl;
  }

  const runSpeedTest = async () => {
    setLoading(true)
    setError({ desktop: null, mobile: null })
    setResults({ desktop: null, mobile: null })
    
    const apiKey = process.env.NEXT_PUBLIC_PAGESPEED
    const formattedUrl = formatUrl(url)
    const fetchData = async (strategy: 'mobile' | 'desktop') => {
      try {
        const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(formattedUrl)}&key=${apiKey}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        
        if (json.error) {
          throw new Error(json.error.message || 'Unknown API error');
        }
        
        return parseResults(json);
      } catch (error) {
        console.error(`Error fetching ${strategy} data:`, error);
        setError(prev => ({ ...prev, [strategy]: `We couldn't retrieve the ${strategy} results. ${error instanceof Error ? error.message : 'An unknown error occurred.'}` }))
        return null
      }
    }

    const desktopResult = await fetchData('desktop')
    setResults(prev => ({ ...prev, desktop: desktopResult }))
    setProgress(100)
    setProgressText('')

    const mobileResult = await fetchData('mobile')
    setResults(prev => ({ ...prev, mobile: mobileResult }))

    setLoading(false)
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', phone: '' };

    if (!fullReportForm.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!fullReportForm.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(fullReportForm.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!fullReportForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(fullReportForm.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleFullReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return;
    }
    setSubmissionStatus('submitting')
    setSubmissionError(null)

    try {
      const response = await fetch('/api/submit-performance-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullReportForm),
      });

      const result = await response.json();
      setSubmissionStatus('success')
      setShowFullReportDialog(false)
      router.push('/speedtest/submission')

    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmissionStatus('error')
      setSubmissionError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  const result = results[device as keyof typeof results]

  return (
    <div className="relative isolate flex flex-col min-h-screen bg-obsidian text-ink">
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-obsidian via-obsidian to-[#11131a]" />
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-[url('/images/texture.png')] opacity-[.06]" />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-obsidian/55 px-8 py-3 backdrop-blur-md">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/aoniqqlogo.png"
            alt="Aoniqq Logo"
            width={150}
            height={150}
            className="w-40 h-20 object-contain"
            priority
          />
        </Link>
        <div className="flex items-center">
            <nav className="hidden gap-9 md:flex">
                <Link href="/websitecreation" className="px-3 py-1.5 text-sm font-medium text-ink hover:text-white transition">
                  Website Creation Service
                </Link>
            </nav>
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-obsidian border-l border-white-_06">
                <nav className="flex flex-col gap-8 mt-12 font-sans">
                <Button asChild variant="outline" className="w-full justify-start border-white-_06 hover:bg-white/5 hover:text-white font-semibold">
                    <Link href="/websitecreation">Website Creation</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </header>

      <main className="container mx-auto relative z-10 pt-32">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center text-white font-serif -tracking-wider"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          {...motionProps}
        >
            Page Speed Test and Insights
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-ink mb-12 text-center max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Enter a web page URL to analyze its speed and receive insights on how to improve its performance. You will receive a detailed report on the page&apos;s performance, accessibility, best practices, and SEO, along with opportunities for improvement.
        </motion.p>
        
        <Card className="bg-white/5 border border-white-_06 mb-12 shadow-diffused-bloom backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input 
                type="url" 
                placeholder="Enter a web page URL"
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                className="w-full sm:flex-grow bg-obsidian/80 border-white-_06 text-white placeholder:text-mute focus:ring-2 focus:ring-royal"
              />
              <HoverButton onClick={runSpeedTest} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze'
                )}
              </HoverButton>
            </div>
            {loading && (
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                {...motionProps}
              >
                <Progress value={progress} className="w-full mb-2" />
                <p className="text-center text-sm text-mute">{progressText}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {(error.desktop || error.mobile) && (
          <Alert variant="destructive" className="mb-12 bg-red-900/40 border-red-400/50 text-white">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.desktop && <p>{error.desktop}</p>}
              {error.mobile && <p>{error.mobile}</p>}
            </AlertDescription>
          </Alert>
        )}

        {result && (
          <Card className="bg-white/5 border border-white-_06 mb-12 shadow-diffused-bloom backdrop-blur-sm">
            <CardContent className="p-8">
              <Tabs value={device} onValueChange={setDevice} className="mb-8">
                <TabsList className="grid w-full grid-cols-2 bg-obsidian/80 rounded-full p-1">
                  <TabsTrigger value="desktop" className="data-[state=active]:bg-royal text-white rounded-full transition-colors duration-300">
                    <Laptop className="mr-2 h-4 w-4" />
                    Desktop
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="data-[state=active]:bg-royal text-white rounded-full transition-colors duration-300">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobile
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center mb-12">
                <ScoreIndicator value={result.performance} label="Performance" />
                <ScoreIndicator value={result.accessibility} label="Accessibility" />
                <ScoreIndicator value={result.bestPractices} label="Best Practices" />
                <ScoreIndicator value={result.seo} label="SEO" />
              </div>

              <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6 text-white font-serif -tracking-wider">Potential Improvements</h2>
                <div className="overflow-x-auto bg-obsidian/80 rounded-lg p-6">
                  {result.opportunities.length > 0 ? (
                    <ul className="list-disc pl-5 text-base text-ink space-y-3">
                      {result.opportunities.slice(0, 5).map((opportunity, index) => (
                        <motion.li 
                          key={index} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="break-words"
                        >
                          <strong className="text-white">{opportunity.title}</strong>: {opportunity.description}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-base text-ink">No improvement opportunities found.</p>
                  )}
                </div>
              </div>

              <div className="mt-16 text-center bg-obsidian/80 p-10 rounded-2xl shadow-diffused-bloom border border-white-_06">
                <h3 className="text-4xl font-bold mb-6 text-tealLux font-serif -tracking-wide">Stop Losing Customers!</h3>
                <p className="mb-8 text-lg text-ink leading-relaxed">Your website&apos;s speed and performance directly impact your bottom line. Slow sites drive customers away and hurt your search rankings.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
                  <div className="flex flex-col items-center">
                    <DollarSign className="w-16 h-16 text-tealLux mb-3" />
                    <p className="text-base font-medium text-white">Increase Revenue</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <TrendingUp className="w-16 h-16 text-tealLux mb-3" />
                    <p className="text-base font-medium text-white">Improve Conversions</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="w-16 h-16 text-tealLux mb-3" />
                    <p className="text-base font-medium text-white">Retain More Visitors</p>
                  </div>
                </div>
                <p className="mb-10 text-xl font-semibold text-white">Get a comprehensive analysis and actionable steps to supercharge your site&apos;s performance!</p>
                <HoverButton
                  onClick={() => setShowFullReportDialog(true)} 
                >
                  Get Your FREE Full Performance Report
                </HoverButton>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Dialog open={showFullReportDialog} onOpenChange={setShowFullReportDialog}>
        <DialogContent className="bg-obsidian/80 backdrop-blur-md text-white border border-white-_06 rounded-lg shadow-diffused-bloom max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center mb-4 font-serif -tracking-wide">Unlock Your Website&apos;s Full Potential</DialogTitle>
            <DialogDescription className="text-lg text-center mb-6 text-mute leading-relaxed">
              Get your FREE comprehensive site analysis report and start outperforming your competitors today!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFullReportSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-mute mb-1">Your Name</Label>
              <Input 
                id="name" 
                value={fullReportForm.name} 
                onChange={(e) => setFullReportForm(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full bg-obsidian/80 text-white border-white-_06 focus:border-royal rounded-md ${formErrors.name ? 'border-red-500' : ''}`}
                required
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-mute mb-1">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={fullReportForm.email} 
                onChange={(e) => setFullReportForm(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full bg-obsidian/80 text-white border-white-_06 focus:border-royal rounded-md ${formErrors.email ? 'border-red-500' : ''}`}
                required
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone" className="block text-sm font-medium text-mute mb-1">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={fullReportForm.phone} 
                onChange={(e) => setFullReportForm(prev => ({ ...prev, phone: e.target.value }))}
                className={`w-full bg-obsidian/80 text-white border-white-_06 focus:border-royal rounded-md ${formErrors.phone ? 'border-red-500' : ''}`}
                required
              />
              {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
            </div>
            <HoverButton 
              type="submit" 
              className="w-full"
              disabled={submissionStatus === 'submitting'}
            >
              {submissionStatus === 'submitting' ? 'Submitting...' : 'Get My FREE Report Now'}
            </HoverButton>
          </form>
          {submissionError && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{submissionError}</AlertDescription>
            </Alert>
          )}
          <p className="text-center text-xs mt-4 text-mute/70">
            We respect your privacy. Your information will never be shared.
          </p>
        </DialogContent>
      </Dialog>

      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-8 md:px-12 border-t border-white-_06 font-sans">
        <div className="flex-shrink-0">
          <Image
            src="/images/aoniqqlogo.png"
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

export default Speedtest;