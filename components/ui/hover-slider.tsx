'use client'

import * as React from "react"
import { MotionConfig, motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

// Types and Context
interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}
const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined)

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSliderProvider"
    )
  }
  return context
}

// Main Slider Component
export const HoverSlider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0)
  const changeSlide = React.useCallback(
    (index: number) => setActiveSlide(index),
    [setActiveSlide]
  )
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className} ref={ref} {...props}>{children}</div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"


// Text Stagger Component
function splitText(text: string) {
  const characters = text.split("");
  return { characters };
}

interface TextStaggerHoverProps {
  text: string
  index: number
}

export const TextStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & TextStaggerHoverProps
>(({ text, index, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const { characters } = splitText(text)
  const isActive = activeSlide === index
  const handleMouse = () => changeSlide(index)

  return (
    <span
      className={cn(
        "relative inline-block origin-bottom overflow-hidden",
        className
      )}
      {...props}
      ref={ref}
      onMouseEnter={handleMouse}
    >
      {characters.map((char, charIndex) => (
        <span
          key={`${char}-${charIndex}`}
          className="relative inline-block overflow-hidden"
        >
          <MotionConfig
            transition={{
              delay: charIndex * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              className="inline-block text-mute"
              initial={{ y: "0%" }}
              animate={isActive ? { y: "-110%" } : { y: "0%" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>

            <motion.span
              className="absolute left-0 top-0 inline-block text-royal"
              initial={{ y: "110%" }}
              animate={isActive ? { y: "0%" } : { y: "110%" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  )
})
TextStaggerHover.displayName = "TextStaggerHover"


// Content Wrapper for the right side
export const HoverSliderContentWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:h-full",
        className
      )}
      {...props}
    />
  )
})
HoverSliderContentWrap.displayName = "HoverSliderContentWrap"

// Description Component (replaces image)
interface HoverSliderDescriptionProps {
  index: number
  text: string
  className?: string
}

export const HoverSliderDescription = React.forwardRef<
  HTMLParagraphElement,
  HoverSliderDescriptionProps
>(({ index, text, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  const isActive = activeSlide === index
  
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className={cn("pointer-events-none", className, {
        'opacity-100': isActive,
        'opacity-0': !isActive
      })}
    >
      {text}
    </motion.p>
  )
})
HoverSliderDescription.displayName = "HoverSliderDescription" 