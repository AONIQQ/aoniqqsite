'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import { crms } from './crm-data'

export default function CRMRecommendationTool() {
  const [userInput, setUserInput] = useState('')
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setRecommendation(null)
    setExplanation(null)

    try {
      const response = await fetch('/api/crm-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const data = await response.json()
      
      const [recommendedCRM, ...explanationParts] = data.result.split('\n')
      setRecommendation(recommendedCRM.trim())
      setExplanation(explanationParts.join('\n').trim())
    } catch (error: any) {
      console.error('Error details:', error)
      setError(`An error occurred: ${error.message}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-center text-clr-text-high">
          Find Your Perfect CRM
        </h1>
        
        <Card className="bg-clr-surface-1 border border-clr-highlight/10 mb-8 shadow-card-luxe">
          <CardHeader>
            <CardTitle className="text-2xl text-clr-text-high">What are you looking for in a CRM?</CardTitle>
            <CardDescription className="text-lg text-clr-text-low opacity-[.92]">Describe your needs and we&apos;ll recommend the best CRM for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="E.g., I need email marketing and lead scoring for my small business"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="bg-clr-surface-0 border-clr-highlight/20 text-clr-text-high placeholder-clr-text-low/50 text-lg py-6"
              />
              <Button type="submit" className="w-full bg-clr-primary hover:bg-clr-primary-light text-clr-text-high text-lg py-6" disabled={isLoading}>
                {isLoading ? 'Getting Recommendation...' : 'Get Recommendation'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {(recommendation || error) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`bg-clr-surface-1 border border-clr-highlight/10 mb-8 shadow-card-luxe`}>
              <CardHeader>
                <CardTitle className="text-2xl text-clr-text-high">
                  Our Recommendation: {recommendation && <span className="text-3xl font-bold text-clr-primary">{recommendation}</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error ? (
                  <div className="flex items-center space-x-2 text-clr-primary-dark">
                    <AlertTriangle className="h-5 w-5" />
                    <p>{error}</p>
                  </div>
                ) : (
                  <>
                    {explanation && <p className="text-lg mb-6 text-clr-text-low opacity-[.92]">{explanation}</p>}
                    {recommendation && crms.find(crm => crm.name === recommendation) && (
                      <Button asChild className="w-full py-6 text-xl font-bold bg-clr-primary hover:bg-clr-primary-light text-clr-text-high transition-all duration-300">
                        <a href={crms.find(crm => crm.name === recommendation)?.referralLink} target="_blank" rel="noopener noreferrer">
                          Start Your Free Trial Now <ArrowRight className="ml-2" />
                        </a>
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="comparison" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 bg-clr-surface-0 p-2 rounded-lg mb-6">
            {['comparison', 'features'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-lg font-semibold py-3 px-6 rounded-md transition-all duration-300 data-[state=active]:bg-clr-primary data-[state=active]:text-clr-text-high hover:bg-clr-surface-1/50"
              >
                {tab === 'comparison' ? 'CRM Comparison' : 'Feature Breakdown'}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="comparison" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {crms.map((crm) => (
                <Card key={crm.name} className="bg-clr-surface-1 border border-clr-highlight/10">
                  <CardHeader className="bg-clr-surface-0">
                    <CardTitle className="text-2xl text-clr-text-high">{crm.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-lg text-clr-text-high">Best For:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-clr-text-low opacity-[.92]">
                        {crm.bestFor.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm leading-relaxed text-clr-text-low opacity-[.92]">{crm.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <strong className="text-clr-text-low block mb-1">Pricing:</strong>
                        <p className="text-clr-text-high">{crm.pricing}</p>
                      </div>
                      <div>
                        <strong className="text-clr-text-low block mb-1">Ease of Use:</strong>
                        <p className="text-clr-text-high">{crm.easeOfUse}</p>
                      </div>
                      <div>
                        <strong className="text-clr-text-low block mb-1">Native Integrations:</strong>
                        <p className="text-clr-text-high">{crm.nativeIntegrations} integrations available</p>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-clr-primary hover:bg-clr-primary-light text-clr-text-high">
                      <a href={crm.referralLink} target="_blank" rel="noopener noreferrer">
                        Try {crm.name} Free
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <Card className="bg-clr-surface-1 border border-clr-highlight/10">
              <CardHeader>
                <CardTitle className="text-2xl text-clr-text-high">Feature Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-clr-highlight/10">
                        <th className="text-left p-4 text-lg text-clr-text-high">Feature</th>
                        {crms.map((crm) => (
                          <th key={crm.name} className="text-center p-4 text-lg text-clr-text-high">{crm.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['Email Marketing', 'CRM', 'Marketing Automation', 'Sales Automation', 'Project Management', 'White-label Solution', 'Agency Tools', 'Funnel Builder', 'Landing Pages', 'Website Builder', 'Integrations'].map((feature) => (
                        <tr key={feature} className="border-b border-clr-highlight/10">
                          <td className="p-4 text-clr-text-low">{feature}</td>
                          {crms.map((crm) => (
                            <td key={`${crm.name}-${feature}`} className="text-center p-4">
                              {crm.features.includes(feature) ? (
                                <CheckCircle2 className="inline-block text-clr-primary h-6 w-6" />
                              ) : (
                                <XCircle className="inline-block text-clr-text-low/50 h-6 w-6" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-clr-surface-1 border border-clr-highlight/10 mb-8 shadow-card-luxe">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-clr-text-high">Want to dive deeper into these CRMs?</h2>
            <p className="mb-6 text-lg text-clr-text-low opacity-[.92]">Our comprehensive comparison guide breaks down every feature and benefit!</p>
            <Button asChild className="bg-clr-primary hover:bg-clr-primary-light text-clr-text-high text-lg py-4 px-8">
              <a href="https://aoniqq.com/blog/crmcomparison" target="_blank" rel="noopener noreferrer">
                Access Full CRM Comparison Guide
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}