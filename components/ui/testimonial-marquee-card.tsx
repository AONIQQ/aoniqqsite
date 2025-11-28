"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export interface TestimonialMarqueeCardProps {
  body: string
  author: string
  role: string
  className?: string
}

const CHARACTER_LIMIT = 200

export function TestimonialMarqueeCard({ 
  body,
  author,
  role,
  className
}: TestimonialMarqueeCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const shouldTruncate = body.length > CHARACTER_LIMIT
  const displayText = shouldTruncate ? body.slice(0, CHARACTER_LIMIT) + "..." : body

  return (
    <>
      <div
        className={cn(
          "flex flex-col rounded-lg border-t",
          "bg-gradient-to-b from-muted/50 to-muted/10",
          "p-4 text-start sm:p-6",
          "hover:from-muted/60 hover:to-muted/20",
          "max-w-[320px] sm:max-w-[320px]",
          "transition-colors duration-300",
          "border-white-_06",
          className
        )}
      >
        <p className="sm:text-md text-sm text-ink leading-relaxed">
          {displayText}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsOpen(true)}
            className="mt-2 text-sm text-tealLux hover:text-teal transition-colors font-medium"
          >
            Read More
          </button>
        )}
        <div className="mt-4 flex flex-col items-start border-t border-white-_06 pt-4">
          <h3 className="text-md font-semibold leading-none text-white">
            {author}
          </h3>
          <p className="text-sm text-mute mt-1">
            {role}
          </p>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-obsidian border-white-_06 text-ink">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-serif">
              {author} - {role}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 pr-4">
            <p className="text-base leading-relaxed text-ink">
              {body}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
