import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { BlogPost } from '@/lib/blog'

export async function GET() {
  try {
    const result = await query('SELECT * FROM blog_posts ORDER BY created_at DESC')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { title, slug, content, excerpt } = await request.json()

  if (!title || !slug || !content || !excerpt) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const result = await query(
      'INSERT INTO blog_posts (title, slug, content, excerpt) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, slug, content, excerpt]
    )
    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}