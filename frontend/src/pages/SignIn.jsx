import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'

const SignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      const { token, email: userEmail, companyName: userCompany } = await login({ email, password })
      localStorage.setItem('token', token)
      // Optionally store user info
      navigate('/explore')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F4F8] dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign In</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-600 dark:text-gray-300">Don't have an account? </span>
        <button
          type="button"
          className="text-blue-600 hover:underline font-semibold"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default SignIn 