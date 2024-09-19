import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { QueryResult } from 'pg'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    const result: QueryResult = await query(
      'INSERT INTO leads (name, email, phone) VALUES ($1, $2, $3) RETURNING id',
      [name, email, phone]
    )

    if (result.rows.length === 0) {
      throw new Error('No id returned from insert operation')
    }

    return NextResponse.json({ message: 'Lead submitted successfully', id: result.rows[0].id }, { status: 201 })
  } catch (error) {
    console.error('Error submitting Lead:', error)
    return NextResponse.json({ error: 'An error occurred while submitting the Lead' }, { status: 500 })
  }
}