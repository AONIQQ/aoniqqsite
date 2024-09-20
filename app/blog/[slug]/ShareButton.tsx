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
import { toast } from 'react-hot-toast'

interface ShareButtonProps {
  title: string
  url: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null); // Add state for notification

  const handleShare = async (method: 'twitter' | 'text' | 'copy') => {
    setIsOpen(false)
    setNotification(null); // Clear previous notification

    switch (method) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setNotification('Link copied to clipboard!'); // Set success message
        } catch (err) {
          console.error('Failed to copy text: ', err);
          setNotification('Failed to copy link'); // Set error message
        }
        break;
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => handleShare('twitter')}>
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleShare('text')}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Text
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleShare('copy')}>
          <Copy className="w-4 h-4 mr-2" />
        Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
      {notification && <div className="notification">{notification}</div>} {/* Display notification */}
    </DropdownMenu>
  )
}