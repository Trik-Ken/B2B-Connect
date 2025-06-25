import { Link, useNavigate } from 'react-router-dom'

const ChatListItem = ({ chat }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/chat/${chat.id}`)}
      className="flex cursor-pointer items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <img
        src={chat.avatar}
        alt={chat.companyName}
        className="h-16 w-16 flex-shrink-0 rounded-full bg-gray-200 object-cover"
      />
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-800 dark:text-white">{chat.companyName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{chat.timestamp}</p>
        </div>
        <div className="flex items-start justify-between">
          <p className="mt-1 w-full truncate text-sm text-gray-600 dark:text-gray-300">
            {chat.lastMessage}
          </p>
          {chat.unreadCount > 0 && (
            <span className="ml-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-600"></span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatListItem 