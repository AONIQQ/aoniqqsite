import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertTriangle, Code, DollarSign, FileText, Image, Video, MessageSquare, ClipboardCheck, Globe } from 'lucide-react'

const journeySteps = [
  {
    title: "Discover",
    badDev: "They get you on the phone, promise you the world, and oversell you their service",
    aoniqq: "We have a two way interview process, you tell us what you're looking for, and if we can help, we proceed. We set the expectations on exactly what you'll be receiving",
    icon: MessageSquare
  },
  {
    title: "Pay",
    badDev: "You pay upfront, probably more than you should",
    aoniqq: "You pay, with a full refund guarantee and the option for 0% APR financing",
    icon: DollarSign
  },
  {
    title: "Design",
    badDev: "They choose a template",
    aoniqq: "We gather any resources, copy, web assets, logos from you and begin building your website with custom code",
    icon: Code
  },
  {
    title: "Copywriting",
    badDev: "They copy and paste text from the internet",
    aoniqq: "We write SEO and conversion optimized custom copy for your site",
    icon: FileText
  },
  {
    title: "Graphics",
    badDev: "They add your logo to the template, change the color scheme, and call it a day",
    aoniqq: "We add all web assets, design and create engaging, aesthetic, and intuitive graphics made specifically for your website",
    icon: Image
  },
  {
    title: "Progress",
    badDev: "They take on more clients and say they need to delay your project",
    aoniqq: "We update you on the process of the site of the site via video recording, ask you for your feedback and any changes you would like implemented",
    icon: Video
  },
  {
    title: "Feedback",
    badDev: "Weeks go by, you message them and they give mutliple lackluster \"we're working on it responses\"",
    aoniqq: "We update the site based on your feedback and organize everything for deployment",
    icon: MessageSquare
  },
  {
    title: "Review",
    badDev: "They decide they need to get this project off their plate and start asking you for copy, web assets, etc, in an attempt to offload work onto you",
    aoniqq: "We do a final review with you to ensure everything is exactly as you want it",
    icon: ClipboardCheck
  },
  {
    title: "Handover",
    badDev: "They deliver the poorly designed website and leave you on your way, at this point they also tell you about all of the hidden fees to actually get your site live",
    aoniqq: "We offer two options, the first is to give you all of your project files and help with setup externally, the second is for us to host your website with our hosting provider for a small monthly fee",
    icon: Globe
  },
  {
    title: "Support",
    badDev: "They've already stopped responding to you, and will not handle hosting, management, updates, or ongoing support",
    aoniqq: "We deploy your website and share are relevant information on hosting and management, we provide ongoing support, maintenance, and edits if your site is hosted on our services, and support if you decide to host your website on your own",
    icon: CheckCircle2
  }
]

export default function WebsiteJourneyMap() {
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(0)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 400 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const width = Math.min(containerWidth - 20, 1200)
        const height = width < 768 ? 300 : 400
        setDimensions({ width, height })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getResponsiveValues = (width: number) => {
    const baseCircleSize = 40
    const baseFontSize = 20
    const baseIconSize = 24
    const baseSpacing = 0.2
    const minSpacing = 0.08

    const scale = Math.max(0.5, width / 1200)
    const spacing = Math.max(minSpacing, baseSpacing * scale)
    
    return {
      circleSize: Math.max(10, Math.floor(baseCircleSize * scale)),
      fontSize: Math.max(8, Math.floor(baseFontSize * scale)),
      iconSize: Math.max(12, Math.floor(baseIconSize * scale)),
      spacing
    }
  }

  const { circleSize, fontSize, iconSize, spacing } = getResponsiveValues(dimensions.width)

  const totalWidth = spacing * 4 + 0.1  // 5 steps per row, with margins on sides
  const leftMargin = (1 - totalWidth) / 2

  const pathPoints = `M ${dimensions.width * leftMargin} ${dimensions.height * 0.3} 
                      L ${dimensions.width * (1 - leftMargin)} ${dimensions.height * 0.3} 
                      C ${dimensions.width * (1 - leftMargin + 0.02)} ${dimensions.height * 0.3}, ${dimensions.width * (1 - leftMargin + 0.02)} ${dimensions.height * 0.7}, ${dimensions.width * (1 - leftMargin)} ${dimensions.height * 0.7} 
                      L ${dimensions.width * leftMargin} ${dimensions.height * 0.7}`

  const stepPositions = Array.from({ length: 10 }, (_, i) => {
    const row = i < 5 ? 0 : 1
    const col = i < 5 ? i : 9 - i
    return {
      x: dimensions.width * (leftMargin + col * spacing),
      y: dimensions.height * (0.3 + row * 0.4)
    }
  })

  return (
    <div className="w-full py-12">
      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white text-center px-4 font-serif -tracking-wide">
        Website Build Journey Map
      </h3>
      <p className="text-center text-ink opacity-[.92] mb-8 max-w-3xl mx-auto px-4 text-sm md:text-base leading-relaxed">
        Click each step in the interactive map below to see how our development process goes vs what you may experience with other developers
      </p>
      <div ref={containerRef} className="relative w-full max-w-[1200px] mx-auto px-2 overflow-x-hidden" style={{ height: `${dimensions.height + 250}px` }}>
        <svg width={dimensions.width} height={dimensions.height} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <defs>
            <linearGradient id="journey-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ABF8E" />
              <stop offset="100%" stopColor="#2454FF" />
            </linearGradient>
          </defs>
          <path
            d={pathPoints}
            fill="none"
            stroke="url(#journey-gradient)"
            strokeWidth={Math.max(2, 6 * (dimensions.width / 1200))}
            strokeLinecap="round"
          />
          {journeySteps.map((step, index) => {
            const { x, y } = stepPositions[index]
            const Icon = step.icon
            return (
              <motion.g 
                key={index} 
                onClick={() => setActiveJourneyStep(index)} 
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={circleSize}
                  fill={activeJourneyStep === index ? '#2454FF' : '#0d0d0d'}
                  stroke={activeJourneyStep === index ? '#5B5BFF' : '#4a4a4a'}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <text
                  x={x}
                  y={y + fontSize / 3}
                  textAnchor="middle"
                  fill="white"
                  fontSize={fontSize}
                  fontWeight="bold"
                >
                  {index === 0 ? 'Start' : index === 9 ? 'Finish' : index + 1}
                </text>
                <foreignObject x={x - iconSize / 2} y={y - circleSize - iconSize - 10} width={iconSize} height={iconSize}>
                  <div className="flex items-center justify-center h-full">
                    <Icon className="w-full h-full text-white" />
                  </div>
                </foreignObject>
              </motion.g>
            )
          })}
        </svg>
        <AnimatePresence mode="wait">
          {activeJourneyStep !== null && (
            <motion.div
              key={activeJourneyStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-0 right-0 mx-auto w-full max-w-[1200px] p-6 bg-obsidian/80 backdrop-blur-md rounded-lg shadow-diffused-bloom border border-white-_06"
              style={{ top: `${dimensions.height + 20}px` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-obsidian/90 p-4 rounded-lg border border-white-_06">
                  <h4 className="font-bold text-mute mb-2 flex items-center text-sm md:text-base">
                    <AlertTriangle className="mr-2 w-4 h-4 md:w-5 md:h-5 text-[#ff3b3b]/70" /> Other Developers
                  </h4>
                  <p className="text-xs md:text-sm text-ink leading-relaxed">{journeySteps[activeJourneyStep].badDev}</p>
                </div>
                <div className="bg-obsidian/90 p-4 rounded-lg border border-white-_06">
                  <h4 className="font-bold text-tealLux mb-2 flex items-center text-sm md:text-base">
                    <CheckCircle2 className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Aoniqq
                  </h4>
                  <p className="text-xs md:text-sm text-ink leading-relaxed">{journeySteps[activeJourneyStep].aoniqq}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}