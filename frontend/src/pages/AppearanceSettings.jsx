import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon, Monitor, ArrowLeft } from 'lucide-react'

const AppearanceSettings = () => {
  const navigate = useNavigate()
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system')
  const [effectiveTheme, setEffectiveTheme] = useState('light')

  useEffect(() => {
    const applyTheme = () => {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      const currentTheme = theme === 'system' ? systemTheme : theme

      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      setEffectiveTheme(currentTheme)
    }

    applyTheme()
    localStorage.setItem('theme', theme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => applyTheme()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const themeOptions = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <div className="flex h-full flex-col bg-gray-100/50 dark:bg-gray-900">
      <header className="bg-white p-5 shadow-sm dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">ConTrad</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => navigate('/profile/settings')}
            className="mb-4 flex items-center space-x-2 text-sm font-semibold text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft size={16} />
            <span>Back to Settings</span>
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Appearance
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Customize the look and feel of the application.
            </p>
          </div>

          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Theme Preference
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose how ConTrad looks to you. Select a theme or sync with your
              system.
            </p>

            <div className="mt-6 space-y-3">
              {themeOptions.map(option => {
                const Icon = option.icon
                const isSelected = theme === option.id
                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg p-4 ring-1 transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white ring-purple-600'
                        : 'text-gray-700 ring-gray-200 hover:ring-purple-500 dark:text-gray-200 dark:ring-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={20} />
                      <span className="font-semibold">{option.label}</span>
                    </div>
                    <input
                      type="radio"
                      name="theme"
                      value={option.id}
                      checked={isSelected}
                      onChange={() => setTheme(option.id)}
                      className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </label>
                )
              })}
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Current effective theme:{' '}
              <span className="font-semibold capitalize text-gray-700 dark:text-gray-200">
                {effectiveTheme}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppearanceSettings 