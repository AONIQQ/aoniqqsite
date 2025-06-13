import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { CheckCircle2, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/ui/GlassButton'
import { HoverButton } from '@/components/ui/HoverButton'

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

const motionProps = {
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
};

export default function PricingSlider({ openContactForm }: PricingSliderProps) {
  const [selectedTierIndex, setSelectedTierIndex] = useState(2)
  const sliderRef = useRef<HTMLDivElement>(null)
  const currentTier = pricingTiers[selectedTierIndex]

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTierIndex(Number(e.target.value))
  }

  const getBackgroundSize = () => {
    const min = 0
    const max = pricingTiers.length - 1
    const percent = ((selectedTierIndex - min) / (max - min)) * 100
    return `${percent}% 100%`
  }

  return (
    <div className="bg-[#0d0d0d]/90 p-8 rounded-2xl border border-white/5 transition-all duration-300 shadow-diffused-bloom mt-8 font-sans backdrop-blur-sm">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-white font-serif -tracking-wide">Estimate Your Project Cost</h3>
        <div className="relative mb-12">
          <input
            type="range"
            min="0"
            max={pricingTiers.length - 1}
            value={selectedTierIndex}
            onChange={handleSliderChange}
            className="w-full h-2 bg-transparent appearance-none cursor-pointer group"
            style={{
                background: `linear-gradient(to right, #2454ff 0%, #5b5bff ${getBackgroundSize()}, #4a4a4a ${getBackgroundSize()}, #4a4a4a 100%)`
            }}
          />
           <div className="flex justify-between mt-2">
            {pricingTiers.map((tier, index) => (
                <div key={index} className="text-center text-xs text-mute w-1/7">
                    ${tier.price.toLocaleString()}
                </div>
            ))}
        </div>
        </div>
        <motion.p 
          className="text-5xl font-bold text-center mt-4 text-white font-mono"
          key={currentTier.price}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          {...motionProps}
        >
          <DollarSign className="inline-block mr-2 h-10 w-10" />
          {currentTier.price.toLocaleString()}
        </motion.p>
        <motion.p 
          className="text-center text-mute mt-2 text-xl font-semibold"
          key={currentTier.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          {...motionProps}
        >
          {currentTier.name}
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
        <AnimatePresence initial={false}>
          {currentTier.features.map((feature, index) => (
            <motion.div
              key={feature}
              className="flex items-center text-ink"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
            >
              <CheckCircle2 className="h-5 w-5 mr-3 text-tealLux flex-shrink-0" />
              <span className="leading-relaxed">{feature}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <p className="text-mute mb-4 leading-relaxed">
          This provides an estimate. To get an exact quote, book a call to discuss your project&apos;s needs.
        </p>
        <HoverButton
           onClick={openContactForm}
        >
          Get Started
        </HoverButton>
      </motion.div>
    </div>
  )
}