import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { CheckCircle2, DollarSign } from 'lucide-react'

const pricingTiers = [
  {
    price: 1000,
    name: "Basic Website Package",
    features: [
      "Custom Design",
      "Mobile Responsiveness",
      "Performance Optimization",
      "Two Pages",
      "Social Media Integration"
    ]
  },
  {
    price: 1500,
    name: "Essential Package",
    features: [
      "Custom Design",
      "Mobile Responsiveness",
      "Performance Optimization",
      "Three Pages",
      "Social Media Integration",
      "Contact Form",
      "Basic SEO (meta tags, title tags, alt tags)",
      "Speed Performance Optimization"
    ]
  },
  {
    price: 2500,
    name: "Advanced Website Package",
    features: [
      "Custom Design",
      "Mobile Responsiveness",
      "Performance Optimization",
      "Four Pages",
      "Social Media Integration",
      "Contact Form",
      "Basic SEO (meta tags, title tags, alt tags)",
      "Speed Performance Optimization",
      "Basic Animations (scrolling animations, hover effects)",
      "Custom Graphics (basic logos or icons)",
      "Advanced SEO (on-page optimization, keywords)"
    ]
  },
  {
    price: 3500,
    name: "Professional Website Package",
    features: [
      "Custom Design",
      "Mobile Responsiveness",
      "Performance Optimization",
      "Five Pages",
      "Social Media Integration",
      "Contact Form",
      "Basic SEO (meta tags, title tags, alt tags)",
      "Speed Performance Optimization",
      "Basic Animations (scrolling animations, hover effects)",
      "Custom Graphics (basic logos or icons)",
      "Advanced SEO (on-page optimization, keywords)",
      "Google Analytics and Conversion Tracking Install",
      "Blog Functionality",
      "Interactive Map or Custom Graphic Integration"
    ]
  },
  {
    price: 5000,
    name: "Premium Website Package",
    features: [
      "Custom Design",
      "Mobile Responsiveness",
      "Performance Optimization",
      "7 Pages",
      "Social Media Integration",
      "Contact Form",
      "Basic SEO (meta tags, title tags, alt tags)",
      "Speed Performance Optimization",
      "Basic Animations (scrolling animations, hover effects)",
      "Custom Graphics (basic logos or icons)",
      "Advanced SEO (on-page optimization, keywords)",
      "Google Analytics and Conversion Tracking Install",
      "Blog Functionality",
      "Interactive Map or Custom Graphic Integration",
      "Interactive Features (maps, sliders, carousels)",
      "Lead Tracking Capabilities",
      "Microsoft Clarity Install",
      "Custom API Integration (simple)"
    ]
  },
  {
    price: 7500,
    name: "Enterprise Website Package",
    features: [
      "Custom Design",
      "Mobile Responsiveness",
      "Performance Optimization",
      "10 Pages",
      "Social Media Integration",
      "Contact Form",
      "Basic SEO (meta tags, title tags, alt tags)",
      "Speed Performance Optimization",
      "Basic Animations (scrolling animations, hover effects)",
      "Custom Graphics (basic logos or icons)",
      "Advanced SEO (on-page optimization, keywords)",
      "Google Analytics and Conversion Tracking Install",
      "Blog Functionality",
      "Interactive Map or Custom Graphic Integration",
      "Interactive Features (maps, sliders, carousels)",
      "Lead Tracking Capabilities",
      "Microsoft Clarity Install",
      "Custom API Integration (simple)",
      "Custom Admin Dashboard (for easy backend management)",
      "Advanced Animations",
      "Custom Copyrighting",
      "Custom Tools (project estimators, calculators)",
      "Advanced SEO with Backlink Building",
      "E-commerce Functionality (up to 25 products)",
      "Ongoing Maintenance, Edits, and Support (for six months) Included"
    ]
  },
  {
    price: 10000,
    name: "Ultimate Website Package",
    features: [
      "Custom Design",
      "Mobile Responsiveness",
      "Performance Optimization",
      "15 Pages",
      "Social Media Integration",
      "Contact Form",
      "Basic SEO (meta tags, title tags, alt tags)",
      "Speed Performance Optimization",
      "Basic Animations (scrolling animations, hover effects)",
      "Custom Graphics (basic logos or icons)",
      "Advanced SEO (on-page optimization, keywords)",
      "Google Analytics and Conversion Tracking Install",
      "Blog Functionality",
      "Interactive Map or Custom Graphic Integration",
      "Interactive Features (maps, sliders, carousels)",
      "Lead Tracking Capabilities",
      "Microsoft Clarity Install",
      "Custom API Integration (complex)",
      "Custom Admin Dashboard (for easy backend management)",
      "Advanced Animations",
      "Custom Copyrighting",
      "Custom Tools (project estimators, calculators)",
      "Advanced SEO with Backlink Building",
      "E-commerce Functionality (50+ products, custom features)",
      "Faster Delivery (priority development, expedited timelines)",
      "Advanced Security Features (SSL, enhanced firewalls)",
      "Ongoing Maintenance, Edits, and Support (for one year) Included"
    ]
  }
]

interface PricingSliderProps {
  openContactForm: () => void;
}

export default function PricingSlider({ openContactForm }: PricingSliderProps) {
  const [selectedTierIndex, setSelectedTierIndex] = useState(2) // Default to Advanced Website Package

  const currentTier = pricingTiers[selectedTierIndex]

  return (
    <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-lg border-2 border-blue-400/50 transition-all duration-300 shadow-2xl">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Estimate Your Project Cost</h3>
        <div className="relative mb-12">
          <div className="flex justify-between items-center">
            {pricingTiers.map((tier, index) => (
              <motion.button
                key={tier.price}
                className={`flex flex-col items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-lg p-3 ${
                  selectedTierIndex === index 
                    ? 'bg-blue-600 text-white shadow-lg z-10' 
                    : 'bg-blue-900/40 text-gray-300 hover:bg-blue-800/60'
                }`}
                onClick={() => setSelectedTierIndex(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={selectedTierIndex === index ? { scale: 1.2 } : { scale: 1 }}
              >
                <span className="text-sm md:text-base lg:text-lg font-bold mb-1">
                  ${tier.price.toLocaleString()}
                </span>
                <motion.div 
                  className={`w-4 h-4 rounded-full ${
                    selectedTierIndex === index ? 'bg-white' : 'bg-gray-500'
                  }`}
                  animate={selectedTierIndex === index ? { scale: 1.5 } : { scale: 1 }}
                />
              </motion.button>
            ))}
          </div>
          <div className="absolute w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 top-1/2 transform -translate-y-1/2 -z-10" />
        </div>
        <motion.p 
          className="text-4xl font-bold text-center mt-4"
          key={currentTier.price}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DollarSign className="inline-block mr-1" />
          {currentTier.price.toLocaleString()}
        </motion.p>
        <motion.p 
          className="text-center text-gray-300 mt-2 text-xl"
          key={currentTier.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentTier.name}
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <AnimatePresence initial={false}>
          {currentTier.features.map((feature, index) => (
            <motion.div
              key={feature}
              className="flex items-center text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" />
              <span>{feature}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-gray-300 mb-4">
          This provides an estimate. To get an exact quote, book a call to discuss your project&apos;s needs.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xl py-4 px-8"
          onClick={openContactForm}
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  )
}