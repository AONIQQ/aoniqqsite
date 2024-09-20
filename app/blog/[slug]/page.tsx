import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog'
import BlogPostContent from './BlogPostContent'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Aoniqq',
    }
  }

  return {
    title: `${post.title} | Aoniqq Blog`,
    description: post.excerpt || `Read ${post.title} on the Aoniqq blog`,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug)
  const allPosts = await getAllBlogPosts()
  const otherPosts = allPosts.filter(p => p.slug !== params.slug).slice(0, 3)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} otherPosts={otherPosts} />
}