import ChatboxHeader from './ChatboxHeader'
import ChatContent from './ChatContent'

const Chatbox = () => {
  return (
    <div className="relative mx-auto flex h-[600px] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
      <ChatboxHeader />

      <div className="flex-1 overflow-y-auto bg-white p-4">
        <ChatContent />
      </div>
    </div>
  )
}

export default Chatbox
