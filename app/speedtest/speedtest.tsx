
'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Smartphone, Laptop, DollarSign, TrendingUp, Users, Menu } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link';



interface PageSpeedResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  opportunities: Array<{ title: string; description: string }>;
}

const ScoreIndicator = ({ value, label }: { value: number; label: string }) => {
  const getColor = (score: number) => {
    if (score >= 90) return '#0cce6b';
    if (score >= 50) return '#ffa400';
    return '#ff4e42';
  };

  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-3xl font-bold border-4 shadow-lg`} style={{ borderColor: getColor(value), color: getColor(value), background: `linear-gradient(135deg, ${getColor(value)}22, ${getColor(value)}44)` }}>
        {value}
      </div>
      <span className="mt-2 text-xs sm:text-sm font-medium text-gray-200">{label}</span>
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
        
        console.log(`PageSpeed ${strategy} data:`, json);
        
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
      console.log('Lead submitted successfully:', result);
      setSubmissionStatus('success')
      setShowFullReportDialog(false)

      // Redirect to submission page
      router.push('/speedtest/submission')

      // Redirect to website creation page after 5 seconds
      setTimeout(() => {
        router.push('/websitecreation')
      }, 5000)

    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmissionStatus('error')
      setSubmissionError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  const result = results[device as keyof typeof results]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000033] to-[#000066] text-white p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Add subtle background pattern */}
      <div className="absolute inset-0 bg-repeat opacity-5" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>

      <header className="mb-8 sm:mb-12 relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            className="relative w-24 h-8 sm:w-32 sm:h-10 md:w-36 md:h-12"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <a href="/">
              <Image
                src="/images/LargeSideLogo.png"
                alt="Aoniqq Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
                priority
              />
            </a>
          </motion.div>
          <nav className="hidden sm:block">
            <Button 
              variant="ghost" 
              className="text-white hover:text-blue-400 transition-colors text-sm sm:text-base"
              onClick={() => router.push('/websitecreation')}
            >
              Website Creation Service
            </Button>
          </nav>
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
        {showMobileMenu && (
          <motion.div 
            className="sm:hidden mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              variant="ghost" 
              className="w-full text-white hover:text-blue-400 transition-colors text-sm"
              onClick={() => {
                router.push('/websitecreation')
                setShowMobileMenu(false)
              }}
            >
              Website Creation Service
            </Button>
          </motion.div>
        )}
      </header>

      <main className="container mx-auto relative z-10">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Page Speed Test and Insights
          </span>
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg md:text-xl font-small text-white mb-6 sm:mb-8 md:mb-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Enter a web page URL to analyze its speed and receive insights on how to improve its performance. You will receive a detailed report on the page&apos;s performance, accessibility, best practices, and SEO, along with opportunities for improvement.
        </motion.p>
        
        <Card className="bg-gradient-to-br from-blue-900/60 to-purple-900/60 border-blue-400/50 mb-6 sm:mb-8 md:mb-12 shadow-xl">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input 
                type="url" 
                placeholder="Enter a web page URL"
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                className="w-full sm:flex-grow bg-blue-900/30 border-blue-400/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
              />
              <Button 
                onClick={runSpeedTest} 
                disabled={loading} 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg transform transition-all hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze'
                )}
              </Button>
            </div>
            {loading && (
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Progress value={progress} className="w-full mb-2" />
                <p className="text-center text-sm">{progressText}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {(error.desktop || error.mobile) && (
          <Alert variant="destructive" className="mb-6 sm:mb-8 md:mb-12 bg-red-900/40 border-red-400/50 text-white">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.desktop && <p>{error.desktop}</p>}
              {error.mobile && <p>{error.mobile}</p>}
            </AlertDescription>
          </Alert>
        )}

        {result && (
          <Card className="bg-gradient-to-br from-blue-900/60 to-purple-900/60 border-blue-400/50 mb-6 sm:mb-8 md:mb-12 shadow-xl">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <Tabs value={device} onValueChange={setDevice} className="mb-6 sm:mb-8">
                <TabsList className="grid w-full grid-cols-2 bg-blue-800/50 rounded-full p-1">
                  <TabsTrigger value="desktop" className="data-[state=active]:bg-blue-600 text-white rounded-full transition-all duration-300">
                    <Laptop className="mr-2 h-4 w-4" />
                    Desktop
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="data-[state=active]:bg-blue-600 text-white rounded-full transition-all duration-300">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobile
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center mb-6 sm:mb-8 md:mb-12">
                <ScoreIndicator value={result.performance} label="Performance" />
                <ScoreIndicator value={result.accessibility} label="Accessibility" />
                <ScoreIndicator value={result.bestPractices} label="Best Practices" />
                <ScoreIndicator value={result.seo} label="SEO" />
              </div>

              <div className="mt-6 sm:mt-8 md:mt-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 text-blue-300">Potential Improvements</h2>
                <div className="overflow-x-auto bg-blue-900/30 rounded-lg p-3 sm:p-4 md:p-6">
                  {result.opportunities.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm sm:text-base md:text-lg text-gray-200 space-y-2 sm:space-y-3">
                      {result.opportunities.slice(0, 5).map((opportunity, index) => (
                        <motion.li 
                          key={index} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="break-words"
                        >
                          <strong className="text-blue-300">{opportunity.title}</strong>: {opportunity.description}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm sm:text-base md:text-lg text-gray-200">No improvement opportunities found.</p>
                  )}
                </div>
              </div>

              <div className="mt-8 sm:mt-12 md:mt-16 text-center bg-gradient-to-br from-blue-800/70 to-purple-800/70 p-4 sm:p-6 md:p-10 rounded-2xl shadow-2xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-yellow-300">Stop Losing Customers Due to Poor Site Performance!</h3>
                <p className="mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg">Your website&apos;s speed and performance directly impact your bottom line. Slow sites drive customers away and hurt your search rankings.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
                  <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-green-400 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm md:text-base font-medium">Increase Revenue</p>
                  </motion.div>
                  <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-blue-400 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm md:text-base font-medium">Improve Conversions</p>
                  </motion.div>
                  <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Users className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-purple-400 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm md:text-base font-medium">Retain More Visitors</p>
                  </motion.div>
                </div>
                <p className="mb-6 sm:mb-8 md:mb-10 text-base sm:text-lg md:text-xl font-semibold">Get a comprehensive analysis and actionable steps to supercharge your site&apos;s performance!</p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                <Button 
  onClick={() => setShowFullReportDialog(true)} 
  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-8 px-6 sm:py-8 sm:px-8 md:py-10 md:px-10 rounded-full text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-lg transition-all duration-300 w-full sm:w-auto"
>
  Get Your FREE Full Performance Report
</Button>

                </motion.div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Dialog open={showFullReportDialog} onOpenChange={setShowFullReportDialog}>
        <DialogContent className="bg-gradient-to-br from-blue-900 to-purple-900 text-white border-2 border-blue-400 rounded-lg shadow-2xl max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 sm:mb-3 md:mb-4">Unlock Your Website&apos;s Full Potential</DialogTitle>
            <DialogDescription className="text-sm sm:text-base md:text-lg text-center mb-3 sm:mb-4 md:mb-6">
              Get your FREE comprehensive site analysis report and start outperforming your competitors today!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFullReportSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
              <Input 
                id="name" 
                value={fullReportForm.name} 
                onChange={(e) => setFullReportForm(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full bg-blue-800/50 text-white border-blue-500 focus:border-blue-300 rounded-md ${formErrors.name ? 'border-red-500' : ''}`}
                required
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <Input 
                id="email" 
                type="email" 
                value={fullReportForm.email} 
                onChange={(e) => setFullReportForm(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full bg-blue-800/50 text-white border-blue-500 focus:border-blue-300 rounded-md ${formErrors.email ? 'border-red-500' : ''}`}
                required
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
              <Input 
                id="phone" 
                type="tel" 
                value={fullReportForm.phone} 
                onChange={(e) => setFullReportForm(prev => ({ ...prev, phone: e.target.value }))}
                className={`w-full bg-blue-800/50 text-white border-blue-500 focus:border-blue-300 rounded-md ${formErrors.phone ? 'border-red-500' : ''}`}
                required
              />
              {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-4 rounded-md text-sm sm:text-base md:text-lg transition-all duration-300"
              disabled={submissionStatus === 'submitting'}
            >
              {submissionStatus === 'submitting' ? 'Submitting...' : 'Get My FREE Report Now'}
            </Button>
          </form>
          {submissionError && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{submissionError}</AlertDescription>
            </Alert>
          )}
          <p className="text-center text-xs sm:text-sm mt-3 sm:mt-4 text-gray-400">
            We respect your privacy. Your information will never be shared.
          </p>
        </DialogContent>
      </Dialog>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">© 2024 Aoniqq LLC. All rights reserved.</p>
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

export default Speedtest;