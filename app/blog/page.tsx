import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts } from '@/lib/blog'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MobileNav from './MobileNav'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | Aoniqq',
  description: 'Read the latest insights and updates from the Aoniqq team on software and website development, AI use cases, project management, CRMs and technology trends.',
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts()

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

      <main className="container mx-auto px-8 py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center text-clr-text-high leading-tight py-2 font-serif -tracking-wider">
          Aoniqq Blog
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="no-underline group">
              <Card className="h-full transition-all duration-300 bg-clr-surface-1 border border-clr-highlight/10 group-hover:bg-clr-surface-1/80 group-hover:-translate-y-1 group-hover:shadow-card-luxe">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-semibold mb-3 text-clr-primary">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-clr-text-low opacity-[.92] mb-4 leading-relaxed">{post.excerpt}</p>
                  <p className="text-xs md:text-sm text-clr-text-low/70 opacity-80">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}