import { BotIcon } from 'lucide-react'

export default function ChatboxHeader() {
  return (
    <div className="flex items-center justify-between rounded-t-xl bg-blue-500 p-4 text-white">
      <div className="flex items-center gap-2">
        <BotIcon />
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold">PARKER</h1>
          <h2 className="text-xs">AI FINDER - RECRUITMENT ASSISTANT</h2>
        </div>
      </div>
    </div>
  )
}
