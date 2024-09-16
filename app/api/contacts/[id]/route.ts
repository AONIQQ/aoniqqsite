import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/options'
import { query } from '@/lib/db'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = params.id

  try {
    const deleteQuery = 'DELETE FROM contacts WHERE id = $1'
    await query(deleteQuery, [id])

    return NextResponse.json({ message: 'Contact deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json({ error: 'Error deleting contact' }, { status: 500 })
  }
}