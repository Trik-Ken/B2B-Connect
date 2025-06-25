import { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import { companyInfo, productCategories, listedProducts } from '../data/mockData'

const Profile = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(productCategories[0])
  const [currentCompany, setCurrentCompany] = useState(companyInfo)

  useEffect(() => {
    // This effect will re-run when the page is visited, effectively "refreshing" the data
    setCurrentCompany({ ...companyInfo })
  }, [])

  const filteredProducts =
    selectedCategory === 'All'
      ? listedProducts
      : listedProducts.filter(product => product.category === selectedCategory)

  return (
    <div className="flex h-full flex-col bg-gray-50 dark:bg-gray-900">
      <header className="flex-shrink-0 px-5 pt-5 pb-3">
        <h1 className="text-center text-2xl font-bold text-blue-500">
          ConTrad
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <img
            src={currentCompany.avatar}
            alt={currentCompany.name}
            className="h-28 w-28 rounded-full border-4 border-white bg-gray-200 object-cover shadow-lg dark:border-gray-800"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
            {currentCompany.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your Company Profile</p>
          <button
            onClick={() => navigate('/profile/settings')}
            className="mt-4 flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
        </div>

        <div className="mt-8 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-white">Description</h3>
          <p className="mb-5 text-sm text-gray-600 dark:text-gray-400">
            {currentCompany.description}
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex">
              <span className="w-24 font-bold text-gray-700 dark:text-gray-300">Email</span>
              <span className="text-gray-600 dark:text-gray-400">{currentCompany.email}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold text-gray-700 dark:text-gray-300">Phone</span>
              <span className="text-gray-600 dark:text-gray-400">{currentCompany.phone}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold text-gray-700 dark:text-gray-300">Address</span>
              <span className="text-gray-600 dark:text-gray-400">{currentCompany.address}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold text-gray-700 dark:text-gray-300">GST Number</span>
              <span className="text-gray-600 dark:text-gray-400">{currentCompany.gst}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Your Listed Products
          </h3>
          <CategoryFilter
            categories={productCategories}
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 