'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { crms } from './crm-data'
//comment

export default function CRMRecommendationTool() {
  const [userInput, setUserInput] = useState('')
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setRecommendation(null)

    try {
      const response = await fetch('/api/crm-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setRecommendation(data.result)
    } catch (error) {
      console.error('Error:', error)
      setError('A network error occurred. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000033] to-[#000066] text-white py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Find Your Perfect CRM
        </motion.h1>
        <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-400/50 mb-8">
          <CardHeader>
            <CardTitle>What are you looking for in a CRM?</CardTitle>
            <CardDescription>Describe your needs and we&apos;ll recommend the best CRM for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="E.g., I need email marketing and lead scoring for my small business"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="bg-blue-900/20 border-blue-400/50 text-white placeholder-gray-400"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
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
            <Card className={`bg-gradient-to-br ${error ? 'from-red-900/40 to-purple-900/40' : 'from-green-900/40 to-blue-900/40'} border-blue-400/50 mb-8`}>
              <CardHeader>
                <CardTitle>{error ? 'Error' : 'Our Recommendation'}</CardTitle>
              </CardHeader>
              <CardContent>
                {error ? (
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                    <p>{error}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-xl mb-4">Based on your needs, we recommend: <strong>{recommendation}</strong></p>
                    {recommendation && crms.find(crm => crm.name === recommendation) && (
                      <>
                        <p className="mb-4">{crms.find(crm => crm.name === recommendation)?.description}</p>
                        <Button asChild className="bg-green-600 hover:bg-green-700">
                          <a href={crms.find(crm => crm.name === recommendation)?.referralLink} target="_blank" rel="noopener noreferrer">
                            Sign Up Now (Special Discount)
                          </a>
                        </Button>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-blue-900/20">
            <TabsTrigger value="comparison">CRM Comparison</TabsTrigger>
            <TabsTrigger value="features">Feature Breakdown</TabsTrigger>
          </TabsList>
          <TabsContent value="comparison">
            <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-400/50">
              <CardHeader>
                <CardTitle>CRM Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {crms.map((crm) => (
                    <Card key={crm.name} className="bg-blue-900/20 border-blue-400/50">
                      <CardHeader>
                        <CardTitle>{crm.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-semibold mb-2">Best For:</h4>
                        <ul className="list-disc pl-5 mb-4">
                          {crm.bestFor.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                          <a href={crm.referralLink} target="_blank" rel="noopener noreferrer">Learn More</a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features">
            <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-400/50">
              <CardHeader>
                <CardTitle>Feature Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-400/50">
                        <th className="text-left p-2">Feature</th>
                        {crms.map((crm) => (
                          <th key={crm.name} className="text-center p-2">{crm.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['Email Marketing', 'CRM', 'Marketing Automation', 'Sales Automation', 'Customer Support', 'E-commerce', 'Appointment Scheduling', 'Invoicing', 'White-label Solution', 'Agency Tools', 'Funnel Builder', 'SMS Marketing'].map((feature) => (
                        <tr key={feature} className="border-b border-blue-400/50">
                          <td className="p-2">{feature}</td>
                          {crms.map((crm) => (
                            <td key={`${crm.name}-${feature}`} className="text-center p-2">
                              {crm.features.includes(feature) ? (
                                <CheckCircle2 className="inline-block text-green-500" />
                              ) : (
                                <XCircle className="inline-block text-red-500" />
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
      </div>
    </div>
  )
}