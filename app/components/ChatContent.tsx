'use client'

import { useChat } from '@ai-sdk/react'
import { ArrowRightIcon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { initialMessage } from '@/lib/utils/initialMessage'

export default function ChatContent() {
  const { messages, handleInputChange, handleSubmit, input } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        content: initialMessage,
        id: 'welcome',
        role: 'assistant',
      },
    ],
  })

  const handleSubmitChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  const RoleLabel = (role: string) => {
    return <p className="text-black text-sm ">{role === 'assistant' ? 'Assistant:' : 'You:'}</p>
  }

  return (
    <div className="flex flex-col size-full pt-3 px-2">
      <div className="h-[calc(100vh-24rem)] px-3 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`w-fit ${message.role === 'user' ? 'ml-auto' : ''}`}>
            {RoleLabel(message.role)}
            <div
              className={`mb-4 mt-2 p-3 rounded-xl ${
                message.role === 'assistant'
                  ? 'rounded-tl-none bg-zinc-100 text-black'
                  : 'ml-auto rounded-tr-none bg-blue-500 text-white'
              }`}
            >
              <div className={`prose p-1 text-sm ${message.role === 'assistant' ? 'text-black' : 'text-white'}`}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitChat}>
        <div className="flex items-center gap-2 absolute bottom-0 left-0 w-full p-3">
          <input
            className="w-full rounded-full border border-zinc-300 p-3 text-sm shadow-xl dark:border-zinc-800 dark:bg-white text-black"
            placeholder="Enter your job vacancy, or ask about agencies, locations, or specialties..."
            onChange={handleInputChange}
            value={input}
          />
          <button type="submit">
            <ArrowRightIcon />
          </button>
        </div>
      </form>
    </div>
  )
}
