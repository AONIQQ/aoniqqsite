import React, { useState, useRef, useEffect } from 'react'

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        className="cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-10 p-2 bg-white text-gray-800 rounded-lg shadow-lg ${className}`}
          style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)' }}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export const TooltipTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => {
  return <>{children}</>
}

export const TooltipContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>
}