import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { crms } from '@/app/crm-recommendation/crm-data'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
  }

  try {
    const { userInput } = await req.json()

    if (!userInput || userInput.trim().length === 0) {
      return NextResponse.json({ error: 'Please enter a valid input' }, { status: 400 })
    }

    const completion = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: generatePrompt(userInput),
      max_tokens: 150,
      temperature: 0.6,
    })

    const recommendedCRM = interpretResponse(completion.choices[0].text || '')
    return NextResponse.json({ result: recommendedCRM })
  } catch (error: any) {
    console.error('API Error:', error)
    if (error.response) {
      return NextResponse.json({ error: 'Error from OpenAI API' }, { status: error.response.status })
    } else if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON in the request' }, { status: 400 })
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
    }
  }
}

function generatePrompt(userInput: string) {
  return `Based on the following user input, recommend the best CRM from this list: ActiveCampaign, Keap, GoHighLevel, HubSpot, Monday.com, Zoho. 
  Consider the features and target audience of each CRM. The user input will be describing the functionality and features that are most important to them. Make your recommendation based on this and what you know about each of the CRM options outlined above. 

  User input: ${userInput}

  Respond with only the name of the recommended CRM.`
}

function interpretResponse(response: string): string {
  const normalizedResponse = response.trim().toLowerCase()
  
  for (const crm of crms) {
    if (normalizedResponse.includes(crm.name.toLowerCase())) {
      return crm.name
    }
  }

  return 'No specific recommendation'
}