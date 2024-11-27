"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Clock, Calendar, Menu, X } from 'lucide-react'
import { ShareButton } from './ShareButton'

type Post = {
  title: string
  content: string
  created_at: string
  slug: string
  excerpt?: string
}

type Props = {
  post: Post
  otherPosts: Post[]
}

const RenderContent: React.FC<{ content: string }> = ({ content }) => {
  const paragraphs = content.split('\n\n');

  const renderTextWithLinksAndBold = (text: string) => {
    const parts = text.split(/(\[.*?\]$$.*?$$|\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      const linkMatch = part.match(/\[(.*?)\]$$(.*?)$$/);
      const boldMatch = part.match(/\*\*(.*?)\*\*/);
      if (linkMatch) {
        const [_, linkText, url] = linkMatch;
        return (
          <a
            key={index}
            href={url}
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        );
      } else if (boldMatch) {
        return <strong key={index}>{boldMatch[1]}</strong>;
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        // Handle different content types
        if (paragraph.startsWith('### ')) {
          return (
            <h3
              key={index}
              className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-blue-300 border-b border-blue-500 pb-2"
            >
              {renderTextWithLinksAndBold(paragraph.slice(4).trim())}
            </h3>
          );
        } else if (paragraph.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="text-2xl md:text-3xl font-bold mt-8 md:mt-12 mb-4 md:mb-6 text-blue-200"
            >
              {renderTextWithLinksAndBold(paragraph.slice(3).trim())}
            </h2>
          );
        } else if (paragraph.startsWith('# ')) {
          return (
            <h1
              key={index}
              className="text-3xl md:text-4xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-blue-100"
            >
              {renderTextWithLinksAndBold(paragraph.slice(2).trim())}
            </h1>
          );
        } else if (paragraph.startsWith('- ')) {
          // Handle lists by splitting into individual items
          const listItems = paragraph.split('\n').map((item) => item.slice(2));
          return (
            <ul
              key={index}
              className="list-disc pl-4 md:pl-6 mb-4 space-y-2 text-sm md:text-base"
            >
              {listItems.map((item, itemIndex) => (
                <li key={itemIndex}>{renderTextWithLinksAndBold(item)}</li>
              ))}
            </ul>
          );
        } else {
          // Handle normal paragraphs
          return (
            <p
              key={index}
              className="mb-4 leading-relaxed text-sm md:text-base text-gray-200"
            >
              {renderTextWithLinksAndBold(paragraph.trim())}
            </p>
          );
        }
      })}
    </>
  );
};


export default function BlogPostContent({ post, otherPosts }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000033] to-[#000066] text-white">
      <header className="bg-blue-900/20 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="relative w-28 h-10 md:w-36 md:h-12">
            <Image
              src="/images/LargeSideLogo.png"
              alt="Aoniqq Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </Link>
          <div className="hidden md:flex space-x-4">
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 text-sm md:text-base">
              <Link href="/websitecreation">Website Creation Service</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 text-sm md:text-base">
              <Link href="/speedtest">Free Website Speed Test</Link>
            </Button>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <nav className="md:hidden bg-blue-900/90 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 text-sm">
              <Link href="/websitecreation">Website Creation</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 text-sm">
              <Link href="/speedtest">Speed Test</Link>
            </Button>
          </div>
        </nav>
      )}

      <main className="container mx-auto px-4 py-6 md:py-8">
        <Link href="/blog" className="inline-flex items-center text-blue-300 hover:text-blue-400 transition-colors mb-4 md:mb-6 text-sm md:text-base">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Blog Home
        </Link>
        <article className="bg-white/10 rounded-lg shadow-xl p-4 md:p-8 backdrop-blur-sm">
          <div className="bg-black/40 rounded-lg p-4 md:p-8 shadow-inner">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">{post.title}</h1>
            <div className="flex items-center justify-center text-gray-300 mb-6 md:mb-8 text-sm md:text-base">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="mr-4">{new Date(post.created_at).toLocaleDateString()}</span>
              <Clock className="w-4 h-4 mr-2" />
              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
            </div>
            <div className="prose prose-invert prose-sm md:prose-base lg:prose-lg max-w-none mb-6 md:mb-8 mx-auto text-gray-100">
              <RenderContent content={post.content} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-4 mt-6 md:mt-8">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/images/LargeSideLogo.png"
                alt="Aoniqq Logo"
                width={32}
                height={32}
                className="rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-sm md:text-base">Aoniqq Writer</p>
                <p className="text-xs md:text-sm text-gray-400">Tech Enthusiast</p>
              </div>
            </div>
            <ShareButton title={post.title} url={`https://yourdomain.com/blog/${post.slug}`} />
          </div>
        </article>
        
        <Card className="mt-8 md:mt-16 bg-blue-900/30 border-blue-400/20">
          <CardContent className="p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-blue-300">Explore Our Services</h2>
            <p className="text-center mb-6 md:mb-8 text-sm md:text-lg">
              Interested in learning more about how Aoniqq can help your business? Check out our services below.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full transition-all duration-200 transform hover:scale-105 text-sm md:text-lg">
                <Link href="/websitecreation">Website Creation</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full transition-all duration-200 transform hover:scale-105 text-sm md:text-lg">
                <Link href="/">Project Management</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 md:mt-16 bg-blue-900/30 border-blue-400/20">
          <CardContent className="p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">See Our Other Blog Posts</h2>
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 bg-blue-800/40 border-blue-400/40 group-hover:bg-blue-700/50 transform hover:scale-105">
                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text group-hover:text-blue-200 transition-colors duration-300">{post.title}</h3>
                      <p className="text-xs md:text-sm text-gray-200 mb-2 md:mb-4">{post.excerpt}</p>
                      <p className="text-xs text-gray-300">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}