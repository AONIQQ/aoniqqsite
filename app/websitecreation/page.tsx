import { Metadata } from 'next'
import { notFound } from 'next/navigation'
// import WebsiteCreation from './websitecreation'

export const metadata: Metadata = {
  title: 'Website Creation Service | Aoniqq',
  description: 'Get a fast, functional, and fully customized website tailored to your business with Aoniqq\'s professional website creation service.',
  openGraph: {
    title: 'Website Creation Service | Aoniqq',
    description: 'Get a fast, functional, and fully customized website tailored to your business with Aoniqq\'s professional website creation service.',
    images: [
      {
        url: '/LargeSideLogo.png', 
        width: 1200,
        height: 630,
        alt: 'Aoniqq Website Creation Service',
      },
    ],
  },
}

export default function WebsiteCreationPage() {
  // Temporarily disabled
  // return <WebsiteCreation />
  notFound()
}