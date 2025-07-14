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

    // Get AI response using streamObject
    // const result = await streamObject({
    //   model: openai('gpt-4-turbo'),
    //   schema: z.object({
    //     recipe: z.object({
    //       name: z.string(),
    //       ingredients: z.array(z.string()),
    //       steps: z.array(z.string()),
    //     }),
    //   }),
    //   prompt: userMessage,
    // })

    // for await (const partialObject of partialObjectStream) {
    //   console.clear()
    //   console.log(partialObject)
    // }

    return aiResponse.toDataStreamResponse()
  } catch (error) {
    console.error('Error parsing request:', error)
    return new Response('Error parsing request', { status: 400 })
  }
}
