import { query } from '@/lib/db'

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  created_at: string;
  updated_at: string;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const result = await query(
      'SELECT id, title, slug, excerpt, created_at FROM blog_posts ORDER BY created_at DESC'
    )
    return result.rows as BlogPost[]
  } catch (error) {
    console.error('Error fetching all blog posts:', error)
    throw error
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const result = await query(
      'SELECT * FROM blog_posts WHERE slug = $1 LIMIT 1',
      [slug]
    )
    return result.rows[0] as BlogPost || null
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    throw error
  }
}