import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import dns from 'dns'
import { promisify } from 'util'

const resolveMx = promisify(dns.resolveMx)

function isEnglish(text: string): boolean {
  const englishPattern = /\b(the|be|to|of|and|a|in|that|have|I|it|for|not|on|with|he|as|you|do|at|this|but|his|by|from|they|we|say|her|she|or|an|will|my|one|all|would|there|their|what|so|up|out|if|about|who|get|which|go|me|help|need|want|can|could|should|would|may|might|must|shall|will|am|is|are|was|were|been|being|has|have|had|having|do|does|did|doing|hi|hello|hey|thanks|thank|please|yes|no|ok|okay|sure|maybe)\b/i;
  
  const latinCharPattern = /^[a-zA-Z\s.,!?'-]+$/;
  
  const words = text.trim().split(/\s+/);
  
  if (words.length <= 3) {
    return latinCharPattern.test(text);
  }
  
  const englishWords = words.filter(word => englishPattern.test(word));
  return (englishWords.length / words.length > 0.3) && latinCharPattern.test(text);
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate name
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Check email deliverability
    try {
      const domain = email.split('@')[1]
      await resolveMx(domain)
    } catch (error) {
      return NextResponse.json({ error: 'Invalid email domain' }, { status: 400 })
    }

    // Validate phone
    const phoneRegex = /^\+?[0-9]{10,12}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    // Validate message language
    if (!isEnglish(message)) {
      return NextResponse.json({ error: 'Please write your message in English' }, { status: 400 })
    }

    // If all validations pass, insert the contact into the database
    const result = await query(
      'INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, phone, message]
    )

    return NextResponse.json({ message: 'Contact submitted successfully', id: result.rows[0].id }, { status: 201 })
  } catch (error) {
    console.error('Error submitting contact:', error)
    return NextResponse.json({ error: 'An error occurred while submitting the contact' }, { status: 500 })
  }
}