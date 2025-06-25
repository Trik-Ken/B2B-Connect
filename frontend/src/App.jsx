import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BottomNavigation from './components/BottomNavigation'
import Explore from './pages/Explore'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import ProductDetails from './pages/ProductDetails'
import ChatRoom from './pages/ChatRoom'
import Settings from './pages/Settings'
import ManageCompany from './pages/ManageCompany'
import EditProduct from './pages/EditProduct'
import SecuritySettings from './pages/SecuritySettings'
import AppearanceSettings from './pages/AppearanceSettings'
import HelpAndSupport from './pages/HelpAndSupport'
import CompanyProfile from './pages/CompanyProfile'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'

const initialChats = [
  {
    id: 'ecobuild-supplies',
    companyName: 'EcoBuild Supplies',
    avatar: 'https://i.imgur.com/nJk2UaA.png',
    lastMessage: 'Sounds good! Let me know if you need help.',
    timestamp: '11:45 AM',
    unreadCount: 2,
  },
  {
    id: 'stark-industries',
    companyName: 'Stark Industries',
    avatar: 'https://i.imgur.com/R5YfS2z.png',
    lastMessage: 'Yes, we have the Arc Reactor in stock.',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 'wayne-enterprises',
    companyName: 'Wayne Enterprises',
    avatar: 'https://i.imgur.com/sV6bF28.png',
    lastMessage: 'The new grappling hook is ready for shipment.',
    timestamp: 'Mon',
    unreadCount: 0,
  },
  {
    id: 'cyberdyne-systems',
    companyName: 'Cyberdyne Systems',
    avatar: 'https://i.imgur.com/m2wAEEp.png',
    lastMessage: 'The T-800 model is our top seller.',
    timestamp: 'Fri',
    unreadCount: 1,
  },
]

function App() {
  const location = useLocation()
  const [currentTab, setCurrentTab] = useState('explore')
  const [chats, setChats] = useState(initialChats)

  const handleMarkChatAsRead = (chatId) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    )
  }

  useEffect(() => {
    const path = location.pathname
    if (path === '/') {
      setCurrentTab('explore')
    } else if (path.startsWith('/chat')) {
      setCurrentTab('chat')
    } else if (path.startsWith('/profile')) {
      setCurrentTab('profile')
    } else {
      setCurrentTab('') // No active tab on other pages like product details
    }
  }, [location])

  const showBottomNav =
    !['/', '/signup', '/signin'].includes(location.pathname) &&
    !location.pathname.startsWith('/chat/') &&
    !location.pathname.startsWith('/product/edit') &&
    !location.pathname.startsWith('/profile/manage')

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-black">
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/chat" element={<Chat chats={chats} onChatClick={handleMarkChatAsRead} />} />
          <Route path="/chat/:chatId" element={<ChatRoom />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route
            path="/profile/settings/security"
            element={<SecuritySettings />}
          />
          <Route
            path="/profile/appearance"
            element={<AppearanceSettings />}
          />
          <Route path="/profile/support" element={<HelpAndSupport />} />
          <Route path="/profile/company/:companyId" element={<CompanyProfile />} />
          <Route path="/profile/manage" element={<ManageCompany />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/product/edit/:productId" element={<EditProduct />} />
        </Routes>
      </main>
      {showBottomNav && <BottomNavigation currentTab={currentTab} />}
    </div>
  )
}

export default App
 