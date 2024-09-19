import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/options'
import { query } from '@/lib/db'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Only allow admins to update lead status
  const body = await request.json()

  try {
    // Start a transaction
    await query('BEGIN')

    for (const contact of body) {
      const { id, status } = contact
      const updateQuery = 'UPDATE leads SET status = $1 WHERE id = $2'
      const values = [status, id]
      await query(updateQuery, values)
    }

    // Commit the transaction
    await query('COMMIT')

    return NextResponse.json({ message: 'Lead statuses updated successfully' }, { status: 200 })
  } catch (error) {
    // Rollback the transaction in case of error
    await query('ROLLBACK')
    console.error('Error updating lead statuses:', error)
    return NextResponse.json({ error: 'Error updating lead statuses' }, { status: 500 })
  }
}