import { Metadata } from 'next'
import CRMRecommendationTool from './CRMRecommendationTool'

export const metadata: Metadata = {
  title: 'CRM Recommendation Tool | Aoniqq',
  description: 'Find the perfect CRM for your business with our AI-powered recommendation tool. Compare features and get personalized suggestions.',
  keywords: 'CRM, Customer Relationship Management, ActiveCampaign, Keap, GoHighLevel, HubSpot, AI recommendation',
}

export default function Page() {
  return <CRMRecommendationTool />
}