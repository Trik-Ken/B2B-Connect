# VCB - Virtual Commerce Bot

A full-stack e-commerce application with React frontend and Node.js backend, featuring Airtable integration for data management.

## 🚀 Features

- **Frontend**: React app with Vite, TailwindCSS, and React Router
- **Backend**: Node.js Express server with Airtable integration
- **Explore Page**: Product browsing with search functionality
- **Chat Page**: Real-time messaging interface
- **Profile Page**: User profile management
- **Bottom Navigation**: Mobile-friendly navigation bar

## 📁 Project Structure

```
vcb/
├── backend/
│   ├── routes/
│   │   ├── products.js
│   │   └── messages.js
│   ├── services/
│   │   ├── productsService.js
│   │   └── messagesService.js
│   ├── server.js
│   ├── package.json
│   └── env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BottomNavigation.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── MessageBubble.jsx
│   │   ├── pages/
│   │   │   ├── Explore.jsx
│   │   │   ├── Chat.jsx
│   │   │   └── Profile.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Airtable account (optional, for real data)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Airtable credentials:
   ```
   AIRTABLE_API_KEY=your_airtable_api_key_here
   AIRTABLE_BASE_ID=your_airtable_base_id_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:3000`

## 🗄️ Airtable Setup (Optional)

If you want to use real data from Airtable:

1. Create an Airtable base with two tables:
   - **Products**: Fields - Title, Price, Image, Description
   - **Messages**: Fields - ChatId, Sender, Message, Timestamp

2. Get your API key from Airtable account settings

3. Get your base ID from the API documentation

4. Add these to your `.env` file

If Airtable is not configured, the app will use mock data automatically.

## 📱 Features

### Explore Page
- Search bar for filtering products
- Product grid with images, titles, and prices
- Responsive design for mobile and desktop

### Chat Page
- Message bubbles for conversation display
- Text input for sending messages
- Auto-scroll to latest messages
- Simulated responses for demo

### Profile Page
- User profile information
- Settings and account management options

### Bottom Navigation
- Three tabs: Explore, Chat, Profile
- Active state indicators
- Smooth navigation between pages

## 🔧 API Endpoints

### Backend Routes

- `GET /api/health` - Health check
- `GET /api/products` - Get all products
- `GET /api/chat/:chatId/messages` - Get messages for a chat

### Frontend API Integration

The frontend uses Axios to communicate with the backend through the `/api` proxy configured in Vite.

## 🎨 Styling

- **TailwindCSS** for utility-first styling
- **Lucide React** for icons
- **Responsive design** for mobile-first approach
- **Modern UI** with smooth transitions and hover effects

## 🚀 Deployment

### Backend Deployment
- Can be deployed to Heroku, Vercel, or any Node.js hosting platform
- Set environment variables in your hosting platform
- Ensure CORS is properly configured for production

### Frontend Deployment
- Build the project: `npm run build`
- Deploy the `dist` folder to any static hosting service
- Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 