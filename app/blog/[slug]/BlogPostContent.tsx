"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Clock, Calendar, Menu, X } from 'lucide-react'
import { ShareButton } from './ShareButton'
import MobileNav from '../MobileNav' // Assuming MobileNav is moved or copied

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
    const parts = text.split(/(\[.*?\]\$\$.*?\$\$|\*\*.*?\*\*)/g); // Updated regex
    return parts.map((part, index) => {
      const linkMatch = part.match(/\[(.*?)\]\$\$(.*?)\$\$/); // Match [Link Text]$$URL$$
      const boldMatch = part.match(/\*\*(.*?)\*\*/); // Match **Bold Text**
  
      if (linkMatch) {
        const [_, linkText, url] = linkMatch;
        return (
          <a
            key={index}
            href={url}
            className="text-clr-primary hover:text-clr-primary-light underline"
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
              className="font-serif -tracking-wide text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-clr-text-high border-b border-clr-highlight/10 pb-2"
            >
              {renderTextWithLinksAndBold(paragraph.slice(4).trim())}
            </h3>
          );
        } else if (paragraph.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="font-serif -tracking-wide text-2xl md:text-3xl font-bold mt-8 md:mt-12 mb-4 md:mb-6 text-clr-text-high"
            >
              {renderTextWithLinksAndBold(paragraph.slice(3).trim())}
            </h2>
          );
        } else if (paragraph.startsWith('# ')) {
          return (
            <h1
              key={index}
              className="font-serif -tracking-wider text-3xl md:text-4xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-clr-text-high"
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
              className="list-disc pl-4 md:pl-6 mb-4 space-y-2 text-sm md:text-base leading-relaxed"
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
              className="mb-4 leading-relaxed text-sm md:text-base text-clr-text-low opacity-[.92]"
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
  return (
    <div className="min-h-screen font-sans">
       <header className="bg-clr-surface-1 py-4 shadow-md border-b border-clr-highlight/10">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <Link href="/" className="relative w-36 h-12">
            <Image
              src="/images/LargeSideLogo.png"
              alt="Aoniqq Logo"
              fill
              objectFit="contain"
              priority
            />
          </Link>
          <div className="hidden md:flex space-x-4">
            <Button asChild className="font-semibold tracking-wide uppercase bg-gradient-to-r from-clr-primary-light to-clr-primary-dark text-clr-text-high font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
              <Link href="/websitecreation">Website Creation Service</Link>
            </Button>
            <Button asChild className="font-semibold tracking-wide uppercase bg-gradient-to-r from-clr-primary-light to-clr-primary-dark text-clr-text-high font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
              <Link href="/speedtest">Free Website Speed Test</Link>
            </Button>
          </div>
          <MobileNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <Link href="/blog" className="inline-flex items-center text-clr-primary hover:text-clr-primary-light transition-colors mb-4 md:mb-6 text-sm md:text-base">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Blog Home
        </Link>
        <article className="bg-clr-surface-1 rounded-lg shadow-card-luxe p-4 md:p-8">
          <div className="bg-clr-surface-0 rounded-lg p-4 md:p-8 shadow-inner">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center text-clr-text-high font-serif -tracking-wider">{post.title}</h1>
            <div className="flex items-center justify-center text-clr-text-low opacity-[.92] mb-6 md:mb-8 text-sm md:text-base">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="mr-4">{new Date(post.created_at).toLocaleDateString()}</span>
              <Clock className="w-4 h-4 mr-2" />
              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
            </div>
            <div className="prose prose-invert prose-sm md:prose-base lg:prose-lg max-w-none mb-6 md:mb-8 mx-auto text-clr-text-high">
              <RenderContent content={post.content} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-clr-highlight/10 pt-4 mt-6 md:mt-8">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/images/LargeSideLogo.png"
                alt="Aoniqq Logo"
                width={32}
                height={32}
                className="rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-sm md:text-base text-clr-text-high">Aoniqq Writer</p>
                <p className="text-xs md:text-sm text-clr-text-low/70 opacity-80">Tech Enthusiast</p>
              </div>
            </div>
            <ShareButton title={post.title} url={`https://aoniqq.com/blog/${post.slug}`} />
          </div>
        </article>
        
        <Card className="mt-8 md:mt-16 bg-clr-surface-1 border border-clr-highlight/10 shadow-card-luxe">
          <CardContent className="p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-clr-primary font-serif -tracking-wide">Explore Our Services</h2>
            <p className="text-center mb-6 md:mb-8 text-sm md:text-lg opacity-[.92] leading-relaxed">
              Interested in learning more about how Aoniqq can help your business? Check out our services below.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild className="font-semibold tracking-wide uppercase bg-gradient-to-r from-clr-primary-light to-clr-primary-dark text-clr-text-high font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                <Link href="/websitecreation">Website Creation</Link>
              </Button>
              <Button asChild className="font-semibold tracking-wide uppercase bg-gradient-to-r from-clr-primary-light to-clr-primary-dark text-clr-text-high font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                <Link href="/">Project Management</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 md:mt-16 bg-clr-surface-1 border-clr-highlight/10 shadow-card-luxe">
          <CardContent className="p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-clr-primary font-serif -tracking-wide">See Our Other Blog Posts</h2>
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <Card className="h-full transition-all duration-300 bg-clr-surface-0 border border-clr-highlight/10 group-hover:bg-clr-surface-0/80 group-hover:-translate-y-1 group-hover:shadow-card-luxe">
                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-clr-primary">{post.title}</h3>
                      <p className="text-xs md:text-sm text-clr-text-low opacity-[.92] mb-2 md:mb-4 leading-relaxed">{post.excerpt}</p>
                      <p className="text-xs text-clr-text-low/70 opacity-80">
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