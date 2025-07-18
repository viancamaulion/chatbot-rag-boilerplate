import { openai } from '@ai-sdk/openai'
import { createClient } from '@supabase/supabase-js'
import { embed } from 'ai'
import { streamText } from 'ai'

// Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(req: Request) {
  try {
    // Get user's message
    const { messages } = await req.json()
    const userMessage = messages[messages.length - 1].content

    // Get embedding for user's message for the matcher function

    // Call Supabase matcher function

    // Hint: Use formatted companies as context for the user's prompt

    // Get AI response using the matched company data as context

    // Return the response in the format expected by useChat
  } catch (error) {
    console.error('Error parsing request:', error)
    return new Response('Error parsing request', { status: 400 })
  }
}
