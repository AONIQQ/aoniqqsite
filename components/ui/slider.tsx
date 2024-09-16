import React, { useState, useEffect, useRef, useCallback } from 'react'

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onValueChange,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const getPercentage = (value: number) => ((value - min) / (max - min)) * 100

  const getValue = (percentage: number) => {
    const rawValue = (percentage / 100) * (max - min) + min
    const steppedValue = Math.round(rawValue / step) * step
    return Math.min(Math.max(steppedValue, min), max)
  }

  const updateValue = useCallback((clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect()
      const percentage = ((clientX - rect.left) / rect.width) * 100
      const newValue = getValue(percentage)
      onValueChange([newValue])
    }
  }, [min, max, step, onValueChange])

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true)
    updateValue(event.clientX)
  }

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isDragging) {
      updateValue(event.clientX)
    }
  }, [isDragging, updateValue])

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div
      ref={sliderRef}
      className={`relative w-full h-2 bg-gray-200 rounded-full cursor-pointer ${className}`}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute h-full bg-blue-500 rounded-full"
        style={{ width: `${getPercentage(value[0])}%` }}
      />
      <div
        className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 -ml-2"
        style={{ left: `${getPercentage(value[0])}%` }}
      />
    </div>
  )
}