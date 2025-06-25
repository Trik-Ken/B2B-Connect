import { useState } from 'react'
import { Search } from 'lucide-react'
import ChatListItem from '../components/ChatListItem'
import { useNavigate } from 'react-router-dom'

const Chat = ({ chats, onChatClick }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleChatClick = (chatId) => {
    if (onChatClick) {
      onChatClick(chatId)
    }
    navigate(`/chat/${chatId}`)
  }

  const filteredChats = chats.filter(chat =>
    chat.companyName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 px-5 pt-5 pb-3 dark:border-gray-800">
        <h1 className="text-center text-2xl font-bold text-blue-500">
          ConTrad
        </h1>
      </header>

      <div className="border-b border-gray-200 px-5 pb-4 dark:border-gray-800">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-transparent bg-gray-100 py-2.5 pl-12 pr-4 text-gray-800 transition-all focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 px-2 py-2">
          {filteredChats.map(chat => (
            <div key={chat.id} onClick={() => handleChatClick(chat.id)}>
              <ChatListItem chat={chat} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chat 