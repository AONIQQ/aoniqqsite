import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const timestamp = searchParams.get('timestamp')

  try {
    const result = await query(
      'SELECT id, name, email, phone, created_at, status FROM leads ORDER BY created_at DESC'
    )

    return NextResponse.json(result.rows, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching contacts' },
      { status: 500 }
    )
  }
}