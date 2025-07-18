import { openai } from '@ai-sdk/openai'
import { createClient } from '@supabase/supabase-js'
import { embed } from 'ai'
import { streamText } from 'ai'

// Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(req: Request) {
  // RAG Integration Reference: Slide #23

  try {
    // 1. Get user's message
    const { messages } = await req.json()
    const userMessage = messages[messages.length - 1].content

    // 2. Get embedding for user's message for the matcher function. Model: openai.embedding('text-embedding-3-small')
    //..

    // 3. Call Supabase matcher function
    //..

    // 4a. Hint: Use formatted companies as context for the user's prompt
    const formattedCompanies = [].map((company: any) => {
      return {
        name: company.name,
        content: company.content,
        similarity: company.similarity_score,
      }
    })

    // 4b. Stringify the formattedCompanies array to be easily understood by the LLM
    const stringifiedCompanies = JSON.stringify(formattedCompanies, null, 2)

    // 5. Get AI response. Inject the stringified companies as context
    //..

    // 6. Return the response in the format expected by useChat
    //..
  } catch (error) {
    console.error('Error parsing request:', error)
    return new Response('Error parsing request', { status: 400 })
  }
}
