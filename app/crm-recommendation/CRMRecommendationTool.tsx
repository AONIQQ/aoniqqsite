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
    <div className="min-h-screen bg-gradient-to-br from-[#000033] to-[#000066] text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-center">
          Find Your Perfect CRM
        </h1>
        
        <Card className="bg-blue-900/40 border-blue-400/50 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">What are you looking for in a CRM?</CardTitle>
            <CardDescription className="text-lg">Describe your needs and we&apos;ll recommend the best CRM for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="E.g., I need email marketing and lead scoring for my small business"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="bg-blue-900/20 border-blue-400/50 text-white placeholder-gray-400 text-lg py-6"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6" disabled={isLoading}>
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
            <Card className={`bg-blue-900/40 border-blue-400/50 mb-8`}>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Our Recommendation: {recommendation && <span className="text-3xl font-bold">{recommendation}</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error ? (
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                    <p>{error}</p>
                  </div>
                ) : (
                  <>
                    {explanation && <p className="text-lg mb-6">{explanation}</p>}
                    {recommendation && crms.find(crm => crm.name === recommendation) && (
                      <Button asChild className="w-full py-6 text-xl font-bold bg-blue-600 hover:bg-blue-700 transition-all duration-300">
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
          <TabsList className="grid w-full grid-cols-2 bg-blue-900/20 p-2 rounded-lg mb-6">
            {['comparison', 'features'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-lg font-semibold py-3 px-6 rounded-md transition-all duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-700/50"
              >
                {tab === 'comparison' ? 'CRM Comparison' : 'Feature Breakdown'}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="comparison" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {crms.map((crm) => (
                <Card key={crm.name} className="bg-blue-900/40 border-blue-400/50">
                  <CardHeader className="bg-blue-800/50">
                    <CardTitle className="text-2xl">{crm.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-lg">Best For:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {crm.bestFor.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm leading-relaxed">{crm.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <strong className="text-blue-200 block mb-1">Pricing:</strong>
                        <p className="text-white">{crm.pricing}</p>
                      </div>
                      <div>
                        <strong className="text-blue-200 block mb-1">Ease of Use:</strong>
                        <p className="text-white">{crm.easeOfUse}</p>
                      </div>
                      <div>
                        <strong className="text-blue-200 block mb-1">Native Integrations:</strong>
                        <p className="text-white">{crm.nativeIntegrations} integrations available</p>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
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
            <Card className="bg-blue-900/40 border-blue-400/50">
              <CardHeader>
                <CardTitle className="text-2xl">Feature Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-400/50">
                        <th className="text-left p-4 text-lg">Feature</th>
                        {crms.map((crm) => (
                          <th key={crm.name} className="text-center p-4 text-lg">{crm.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['Email Marketing', 'CRM', 'Marketing Automation', 'Sales Automation', 'Project Management', 'White-label Solution', 'Agency Tools', 'Funnel Builder', 'Landing Pages', 'Website Builder', 'Integrations'].map((feature) => (
                        <tr key={feature} className="border-b border-blue-400/50">
                          <td className="p-4">{feature}</td>
                          {crms.map((crm) => (
                            <td key={`${crm.name}-${feature}`} className="text-center p-4">
                              {crm.features.includes(feature) ? (
                                <CheckCircle2 className="inline-block text-green-500 h-6 w-6" />
                              ) : (
                                <XCircle className="inline-block text-red-500 h-6 w-6" />
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

        <Card className="bg-blue-900/40 border-blue-400/50 mb-8">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to dive deeper into these CRMs?</h2>
            <p className="mb-6 text-lg">Our comprehensive comparison guide breaks down every feature and benefit!</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-lg py-4 px-8">
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