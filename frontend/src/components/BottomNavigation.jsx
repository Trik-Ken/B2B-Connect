import { useNavigate } from 'react-router-dom'
import { Home, MessageCircle, User } from 'lucide-react'

const BottomNavigation = ({ currentTab }) => {
  const navigate = useNavigate()

  const tabs = [
    {
      id: 'explore',
      label: 'Explore',
      icon: Home,
      path: '/'
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageCircle,
      path: '/chat'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile'
    }
  ]

  return (
    <nav className="border-t border-gray-200 bg-white px-4 pt-2 pb-1 shadow-t dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`relative flex flex-col items-center space-y-1 pb-2 pt-1 transition-colors ${
                isActive ? 'text-blue-500' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 h-0.5 w-full rounded-full bg-blue-500" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation 