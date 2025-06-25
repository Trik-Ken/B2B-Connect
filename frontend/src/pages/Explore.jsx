import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { productsAPI } from '../services/api'
import { listedProducts } from '../data/mockData'

const Explore = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // For now, use mock data for company search
        setProducts(listedProducts)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Enhanced search: if searchTerm matches a company, show only that company's products
  const lowerSearch = searchTerm.toLowerCase()
  const companyMatch = products.find(p => p.companyName && p.companyName.toLowerCase() === lowerSearch)
  const filteredProducts = companyMatch
    ? products.filter(p => p.companyName && p.companyName.toLowerCase() === lowerSearch)
    : products.filter(
        product =>
          product.title.toLowerCase().includes(lowerSearch) ||
          product.description.toLowerCase().includes(lowerSearch) ||
          (product.companyName && product.companyName.toLowerCase().includes(lowerSearch))
      )

  return (
    <div className="flex h-full flex-col bg-[#F0F4F8] dark:bg-gray-900">
      <header className="px-5 pt-5 pb-3">
        <h1 className="text-center text-2xl font-bold text-blue-500">
          ConTrad
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto px-5">
        <div className="py-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Discover Products</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Find the best B2B products for your business needs.
          </p>
        </div>

        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products by name, category"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-800 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-blue-500"
          />
        </div>

        {loading && (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading products...</div>
        )}
        {error && <div className="text-center text-red-500">{error}</div>}

        {!loading && !error && (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map(product => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                      {product.companyName}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                No products found.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default Explore 