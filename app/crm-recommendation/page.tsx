import { Metadata } from 'next'
import CRMRecommendationTool from './CRMRecommendationTool'

export const metadata: Metadata = {
  title: 'CRM Recommendation Tool | Find the Best CRM for Your Business',
  description: 'Find the perfect CRM for your business with our AI-powered recommendation tool. Type in the features or use cases you are looking for, and our tool will recommend the best CRM for you. Compare features and get personalized suggestions.',
  keywords: 'CRM, Which CRM to use, Best CRM, Customer Relationship Management, More Leads, ActiveCampaign, Keap, GoHighLevel, Monday.com, Zoho, CRM recommendation, AI recommendation',
}

export default function Page() {
  return <CRMRecommendationTool />
}