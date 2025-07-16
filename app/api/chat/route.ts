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
    const { embedding: userQueryEmbedding } = await embed({
      value: userMessage,
      model: openai.embedding('text-embedding-3-small'),
    })

    // Call Supabase matcher function
    const { data: matchedCompanies } = await supabase.rpc('chatbot_company_matcher', {
      user_query_embedding: userQueryEmbedding,
      match_count: 7,
      match_threshold: 0.9,
    })

    // Hint: Use formatted companies as context for the user's prompt
    const formattedCompanies = (matchedCompanies || []).map((company: any) => ({
      id: company.company_id,
      content: company.content,
      similarity: company.similarity_score,
    }))

    // Get AI response using the matched company data as context
    const result = await streamText({
      model: openai.chat('gpt-4o'),

      messages: [
        // Set system instructions to define the chatbot’s behavior and scope
        {
          role: 'system',
          content: `You are a helpful assistant that provides information about companies. 
          Use the following company information to answer the user's query. 
          If no companies are found, politely inform the user.
          
         If a user asks about unrelated topics (e.g., weather, personal advice, current events), politely redirect them by saying you can only assist with company-related questions. 
         Do not attempt to answer questions outside this scope.            
          `,
        },

        // Provide user's query and inject matched company information in their prompt
        {
          role: 'user',
          // Hint: inject the formatted company information as context.
          content: `User query: ${userMessage}
          
          Company information:
          `,
        },
      ],
      temperature: 0.7,
    })

    // Return the response in the format expected by useChat
    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Error parsing request:', error)
    return new Response('Error parsing request', { status: 400 })
  }
}
