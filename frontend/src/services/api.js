import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/products')
    return response.data
  }
}

// Messages API
export const messagesAPI = {
  getByChatId: async (chatId) => {
    const response = await api.get(`/chat/${chatId}/messages`)
    return response.data
  }
}

export default api 