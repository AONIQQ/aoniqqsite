import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query(
      'SELECT id, name, email, phone, message, created_at, status FROM contacts ORDER BY created_at DESC'
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching contacts' },
      { status: 500 }
    )
  }
}