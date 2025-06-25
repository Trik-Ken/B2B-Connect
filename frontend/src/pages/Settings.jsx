import { useNavigate } from 'react-router-dom'
import {
  Building,
  ShieldCheck,
  Bell,
  Palette,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const settingsOptions = [
  {
    icon: Building,
    label: 'Manage Company & Products',
    path: '/profile/manage',
  },
  {
    icon: ShieldCheck,
    label: 'Security & Login',
    path: '/profile/security',
  },
  {
    icon: Bell,
    label: 'Notification Preferences',
    path: '/profile/notifications',
  },
  { icon: Palette, label: 'Appearance', path: '/profile/appearance' },
  { icon: HelpCircle, label: 'Help & Support', path: '/profile/support' },
]

const Settings = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col bg-gray-50 dark:bg-gray-900">
      <header className="px-5 pt-5 pb-3">
        <h1 className="text-center text-2xl font-bold text-blue-500">
          ConTrad
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="space-y-3">
          {settingsOptions.map(option => {
            const Icon = option.icon
            return (
              <div
                key={option.label}
                onClick={() => navigate(option.path)}
                className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <Icon className="text-gray-600 dark:text-gray-400" size={24} />
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {option.label}
                  </span>
                </div>
                <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-4">
        <button
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-500 py-3 font-bold text-white shadow-md transition-colors hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          onClick={() => {
            // Clear user state here if you have any (e.g., localStorage.removeItem('user'))
            navigate('/')
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Settings 