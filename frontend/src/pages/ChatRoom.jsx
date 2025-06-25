import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  Phone,
  Info,
  Send,
  Paperclip,
  Mic,
  Copy,
  X,
  FileText,
  Video,
  Image as ImageIcon,
} from 'lucide-react'
import MessageBubble from '../components/MessageBubble'
import { listedProducts, companyInfo as myCompanyInfo } from '../data/mockData' // Assuming seller might be a user too
import Toast from '../components/Toast'

// Mock data to get seller info based on chatId
const sellers = {
  'ecobuild-supplies': {
    id: 'eco-build',
    name: 'EcoBuild Supplies',
    avatar: 'https://i.imgur.com/nJk2UaA.png',
    phone: '+1-202-555-0134',
    products: listedProducts.slice(0, 2),
  },
  'stark-industries': {
    id: 'stark',
    name: 'Stark Industries',
    avatar: 'https://i.imgur.com/R5YfS2z.png',
    phone: '+1-202-555-0176',
    products: listedProducts.slice(2, 4),
  },
  'wayne-enterprises': {
    id: 'wayne',
    name: 'Wayne Enterprises',
    avatar: 'https://i.imgur.com/sV6bF28.png',
    phone: '+1-202-555-0152',
    products: [],
  },
  'cyberdyne-systems': {
    id: 'cyberdyne',
    name: 'Cyberdyne Systems',
    avatar: 'https://i.imgur.com/m2wAEEp.png',
    phone: '+1-202-555-0188',
    products: [listedProducts[4]],
  },
}

const CallModal = ({ phone, onClose }) => {
  const [copied, setCopied] = useState(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <h3 className="text-lg font-bold dark:text-white">Contact Number</h3>
        <p className="my-4 text-2xl font-semibold text-blue-600 dark:text-blue-400">
          {phone}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="flex flex-1 items-center justify-center space-x-2 rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            <Copy size={16} />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <X size={20} className="dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

const AttachmentPreview = ({ file, onRemove }) => {
  const getFileIcon = () => {
    if (file.type.startsWith('image/'))
      return <ImageIcon className="h-10 w-10 text-gray-500" />
    if (file.type.startsWith('video/'))
      return <Video className="h-10 w-10 text-gray-500" />
    return <FileText className="h-10 w-10 text-gray-500" />
  }

  return (
    <div className="relative mb-2 rounded-lg bg-gray-200 p-2 dark:bg-gray-700">
      <div className="flex items-center space-x-2">
        {getFileIcon()}
        <div className="truncate">
          <p className="truncate text-sm font-semibold dark:text-white">
            {file.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="absolute -top-1 -right-1 rounded-full bg-gray-500 p-0.5 text-white"
      >
        <X size={14} />
      </button>
    </div>
  )
}

const ChatRoom = () => {
  const { chatId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const seller = sellers[chatId] || { name: 'Unknown', avatar: '', phone: '' }

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newMessage, setNewMessage] = useState(location.state?.prefill || '')
  const [attachment, setAttachment] = useState(null)
  const [showCallModal, setShowCallModal] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    setMessages([])
    setLoading(true)
    setError(null)
    setNewMessage('')
    setAttachment(null)
    setShowCallModal(false)
    setToast({ show: false, message: '' })

    // Replace this with actual API call
    setTimeout(() => {
      setMessages([
        { id: '1', chatId, sender: 'me', message: 'Hello!', timestamp: new Date().toISOString() },
        { id: '2', chatId, sender: 'seller', message: 'Hi! How can I help you today?', timestamp: new Date().toISOString() },
      ])
      setLoading(false)
    }, 1000)
  }, [chatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    const content = newMessage.trim()
    if (!content && !attachment) return

    const message = {
      id: Date.now().toString(),
      chatId,
      sender: 'me',
      message: content,
      attachment: attachment
        ? {
            name: attachment.name,
            type: attachment.type,
            size: attachment.size,
            url: URL.createObjectURL(attachment),
          }
        : null,
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, message])
    setNewMessage('')

    if (attachment) {
      setToast({ show: true, message: 'Attachment sent!' })
    }

    setAttachment(null)
  }

  const handleAttachmentClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      setAttachment(file)
    }
  }

  return (
    <div className="flex h-full flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="flex flex-shrink-0 items-center justify-between border-b bg-white px-4 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft size={24} />
          </button>
          <img
            src={seller.avatar}
            alt={seller.name}
            className="h-10 w-10 rounded-full bg-gray-200"
          />
          <h2 className="font-semibold text-gray-800 dark:text-white">
            {seller.name}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCallModal(true)}
            className="p-2 text-gray-600 dark:text-gray-300"
          >
            <Phone size={20} />
          </button>
          <button
            onClick={() => navigate(`/profile/company/${seller.id}`)}
            className="p-2 text-gray-600 dark:text-gray-300"
          >
            <Info size={20} />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading &&
          !error &&
          messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
        {attachment && (
          <AttachmentPreview
            file={attachment}
            onRemove={() => setAttachment(null)}
          />
        )}
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={handleAttachmentClick}
            className="p-2 text-gray-500 dark:text-gray-400"
          >
            <Paperclip size={22} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 rounded-full border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSendMessage}
            className="rounded-full bg-blue-600 p-2 text-white disabled:bg-gray-400"
            disabled={!newMessage.trim() && !attachment}
          >
            <Send size={22} />
          </button>
        </div>
      </div>

      {showCallModal && (
        <CallModal phone={seller.phone} onClose={() => setShowCallModal(false)} />
      )}
      <Toast
        title={toast.message}
        show={toast.show}
        onClose={() => setToast({ show: false, message: '' })}
      />
    </div>
  )
}

export default ChatRoom 