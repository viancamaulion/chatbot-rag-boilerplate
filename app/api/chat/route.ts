import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export async function POST(req: Request) {
  try {
    // Get user's message
    const { messages } = await req.json()
    const userMessage = messages[messages.length - 1].content

    // Get AI response using streamText
    const aiResponse = streamText({
      model: openai('gpt-4o'),
      prompt: userMessage,
    })

    return aiResponse.toDataStreamResponse()
  } catch (error) {
    console.error('Error parsing request:', error)
    return new Response('Error parsing request', { status: 400 })
  }
}
