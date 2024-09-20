import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts } from '@/lib/blog'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MobileNav from './MobileNav'

export const metadata: Metadata = {
  title: 'Blog | Aoniqq',
  description: 'Read the latest insights and updates from Aoniqq on software development, project management, and technology trends.',
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000033] to-[#000066] text-white">
      <header className="bg-blue-900/20 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="relative w-36 h-12">
            <Image
              src="/images/LargeSideLogo.png"
              alt="Aoniqq Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </Link>
          <div className="hidden md:flex space-x-4">
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105">
              <Link href="/websitecreation">Website Creation Service</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105">
              <Link href="/speedtest">Free Website Speed Test</Link>
            </Button>
          </div>
          <MobileNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight py-2">
          Aoniqq Blog
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="no-underline">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 bg-blue-800/40 border-blue-400/40 hover:bg-blue-700/50 transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-semibold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-gray-300 mb-2">{post.excerpt}</p>
                  <p className="text-xs md:text-sm text-gray-400">
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