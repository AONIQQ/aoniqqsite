'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Share2, Twitter, Mail, MessageSquare, Copy } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ShareButtonProps {
  title: string
  url: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null);

  const handleShare = async (method: 'twitter' | 'text' | 'copy') => {
    setIsOpen(false)
    setNotification(null);

    switch (method) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setNotification('Link copied to clipboard!'); 
        } catch (err) {
          console.error('Failed to copy text: ', err);
          setNotification('Failed to copy link'); 
        }
        break;
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center border-clr-highlight/20 hover:bg-clr-primary-dark hover:text-clr-text-high font-sans font-semibold">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-clr-surface-1 border-clr-highlight/10 text-clr-text-low font-sans">
        <DropdownMenuItem onSelect={() => handleShare('twitter')} className="hover:bg-clr-primary-dark focus:bg-clr-primary-dark">
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleShare('text')} className="hover:bg-clr-primary-dark focus:bg-clr-primary-dark">
          <MessageSquare className="w-4 h-4 mr-2" />
          Text
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleShare('copy')} className="hover:bg-clr-primary-dark focus:bg-clr-primary-dark">
          <Copy className="w-4 h-4 mr-2" />
        Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
      {notification && <div className="fixed bottom-5 right-5 bg-clr-surface-1 p-3 rounded-lg shadow-card-luxe text-clr-text-high font-sans">{notification}</div>}
    </DropdownMenu>
  )
}