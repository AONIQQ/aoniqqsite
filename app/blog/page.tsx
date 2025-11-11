import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts } from '@/lib/blog'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MobileNav from './MobileNav'
import { HoverButton } from '@/components/ui/HoverButton'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | Aoniqq',
  description: 'Read the latest insights and updates from the Aoniqq team on software and website development, AI use cases, project management, CRMs and technology trends.',
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="relative isolate flex flex-col min-h-screen bg-obsidian text-ink">
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-obsidian via-obsidian to-[#11131a]" />
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-[url('/images/texture.png')] opacity-[.06]" />
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-obsidian/55 px-8 py-4 backdrop-blur-md">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/aoniqqlogo.png"
            alt="Aoniqq Logo"
            width={400}
            height={400}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>
        <div className="flex items-center">
          <div className="hidden lg:flex space-x-4 items-center">
            <Link href="/websitecreation" passHref>
              <HoverButton>Website Creation Service</HoverButton>
            </Link>
            <Link href="/speedtest" passHref>
              <HoverButton>Free Website Speed Test</HoverButton>
            </Link>
          </div>
          <MobileNav />
        </div>
      </header>

      <main className="container mx-auto px-8 pt-32 pb-16">
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