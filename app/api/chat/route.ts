import { OpenAI } from 'openai'
import { openai as openAiStream } from '@ai-sdk/openai'
import { createClient } from '@supabase/supabase-js'

import { streamText } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

// Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(req: Request) {
  try {
    // Get user's message
    const { messages } = await req.json()
    const userMessage = messages[messages.length - 1].content

    // Get embedding for user's message
    const embeddingResponse = await openai.embeddings.create({
      input: userMessage,
      model: 'text-embedding-3-small',
    })
    const userQueryEmbedding = embeddingResponse.data[0].embedding

    // Call Supabase vector function
    const { data: matchedCompanies } = await supabase.rpc('chatbot_company_matcher', {
      user_query_embedding: userQueryEmbedding,
      match_count: 7,
      match_threshold: 0.9,
    })

    // Format companies for the response
    const formattedCompanies = (matchedCompanies || []).map((company: any) => ({
      id: company.company_id,
      content: company.content,
      similarity: company.similarity_score,
    }))

    // Get AI response with the formatted companies as context using streamText
    //...

    // Return the response in the format expected by useChat using toDataStreamResponse()
    //...
  } catch (error) {
    console.error('Error parsing request:', error)
    return new Response('Error parsing request', { status: 400 })
  }
}
