import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F4F8] dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to ConTrad</h1>
      <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 text-center max-w-xl">
        ConTrad is your B2B marketplace for discovering, managing, and connecting with companies and products. Sign up or sign in to get started!
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/signup')}
          className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate('/signin')}
          className="px-8 py-3 rounded-lg bg-white text-blue-600 font-semibold shadow border border-blue-600 hover:bg-blue-50 transition"
        >
          Sign In
        </button>
      </div>
    </div>
  )
}

export default Landing 