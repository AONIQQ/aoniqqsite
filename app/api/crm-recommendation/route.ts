import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: 'org-2yrhQAa9Z7SFmunk8GABxx1e',
});

export async function POST(req: Request) {
  console.log('API route called')

  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key not configured')
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
  }

  try {
    const { userInput } = await req.json()
    console.log('User input:', userInput)

    if (!userInput || typeof userInput !== 'string') {
      console.error('Invalid user input:', userInput)
      return NextResponse.json({ error: 'Invalid user input' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a CRM expert. Your task is to recommend one CRM from the following list based on the user's needs: ActiveCampaign, Keap, GoHighLevel, and Monday.com. Consider what you already know about the CRM's and the following:

          1. GoHighLevel is specifically built for marketing agencies and offers white-label solutions.
          2. ActiveCampaign excels in email marketing and marketing automation for various business sizes.
          3. Keap is great for small businesses and solopreneurs, offering CRM, marketing, and sales tools.
          4. Monday.com is versatile, offering project management alongside CRM features.

          Analyze the user's input carefully and recommend the most suitable CRM. Respond with just the name of the recommended CRM first and a brief explanation (2-5 sentences) of why it's the best fit for their use case.`
        },
        {
          role: "user",
          content: userInput
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    if (!completion.choices[0]?.message?.content) {
      console.error('No content in OpenAI response')
      return NextResponse.json({ error: 'Failed to generate recommendation' }, { status: 500 })
    }

    const recommendedCRM = completion.choices[0].message.content.trim()
    console.log('Recommended CRM:', recommendedCRM)
    
    return NextResponse.json({ result: recommendedCRM })
  } catch (error: any) {
    console.error('API Error:', error)
    
    if (error instanceof OpenAI.APIError) {
      const status = error.status || 500
      const message = error.message || 'An error occurred with the OpenAI API'
      
      if (error.status === 401) {
        return NextResponse.json({ 
          error: 'Authentication error with OpenAI API. Please check your API key and organization settings.',
          details: message
        }, { status: 401 })
      }
      
      if (error.status === 429) {
        return NextResponse.json({ 
          error: 'Rate limit exceeded. Please try again later.',
          details: message
        }, { status: 429 })
      }
      
      return NextResponse.json({ 
        error: message,
        details: error.code || 'unknown_error'
      }, { status })
    }
    
    return NextResponse.json({ 
      error: 'An unexpected error occurred',
      details: error.message 
    }, { status: 500 })
  }
}