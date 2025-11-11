import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog'
import BlogPostContent from './BlogPostContent'

type Props = {
  params: { slug: string }
}

// Dynamically generate metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found | Aoniqq',
      description: 'The blog post you are looking for does not exist.',
      robots: 'noindex, nofollow',
      openGraph: {
        title: 'Blog Post Not Found | Aoniqq',
        description: 'The blog post you are looking for does not exist.',
        url: `https://www.aoniqq.com/blog/${params.slug}`,
        images: [
          {
            url: '/images/LargeSideLogo.png',
            width: 1200,
            height: 630,
            alt: 'Aoniqq Logo',
          },
        ],
      },
    }
  }

  return {
    title: `${post.title} | Aoniqq Blog`,
    description: post.excerpt || `Read ${post.title} on the Aoniqq blog to discover insights, tips, and tools.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Learn more about ${post.title} in this article.',
      url: `https://www.aoniqq.com/blog/${params.slug}`,
      images: [
        {
          url: '/images/LargeSideLogo.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || 'Discover more insights in our blog post.',
      images:  '/images/LargeSideLogo.png',
    },
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
