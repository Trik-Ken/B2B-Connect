import { useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

const Toast = ({ title, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // Auto-dismiss after 3 seconds

      return () => {
        clearTimeout(timer)
      }
    }
  }, [show, onClose])

  if (!show) {
    return null
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm animate-fade-in-up">
      <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800">
        <div className="flex-shrink-0">
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800 dark:text-white">{title}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

export default Toast 