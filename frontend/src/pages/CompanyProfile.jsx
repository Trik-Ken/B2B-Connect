import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'
import ProductCard from '../components/ProductCard'

// Mock data - in a real app, this would come from an API
const allCompanies = {
  'eco-build': {
    id: 'eco-build',
    name: 'EcoBuild Supplies',
    avatar: 'https://i.imgur.com/nJk2UaA.png',
    email: 'contact@ecobuild.com',
    phone: '+1-202-555-0134',
    address: '789 Green Way, Enviro City, EC 54321',
    description:
      'EcoBuild Supplies provides high-quality, sustainable building materials for a greener future. We specialize in recycled and eco-friendly products.',
    products: [
      {
        id: 'prod-eco-panels',
        title: 'Eco-Friendly Insulation Panels',
        description: 'Made from 100% recycled materials, providing excellent thermal insulation.',
        price: 25.5,
        currency: '₹',
        imagePlaceholder: 'EcoPanels',
        category: 'Building Materials',
      },
    ],
  },
  stark: {
    id: 'stark',
    name: 'Stark Industries',
    avatar: 'https://i.imgur.com/R5YfS2z.png',
    email: 'info@stark-industries.com',
    phone: '+1-202-555-0176',
    address: '10880 Malibu Point, Malibu, CA 90265',
    description:
      'Leading the world in advanced technology, from clean energy to aerospace. Innovation is at the heart of everything we do.',
    products: [
      {
        id: 'prod-arc-reactor',
        title: 'Miniature Arc Reactor',
        description: 'A compact, self-sustaining power source. Perfect for powering... well, anything.',
        price: 1500000,
        currency: '₹',
        imagePlaceholder: 'ArcReactor',
        category: 'Energy',
      },
    ],
  },
}

const CompanyProfile = () => {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const company = allCompanies[companyId]

  if (!company) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        Company not found.
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-100/50 dark:bg-gray-900">
      <header className="flex flex-shrink-0 items-center space-x-4 bg-white p-4 shadow-sm dark:bg-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="p-1 text-gray-600 dark:text-gray-300"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Company Profile
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          {/* Company Header */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start">
            <img
              src={company.avatar}
              alt={company.name}
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg dark:border-gray-800"
            />
            <div className="mt-4 text-center sm:mt-0 sm:ml-6 sm:text-left">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {company.name}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {company.description}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
              Contact Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {company.email}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {company.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {company.address}
                </span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
              Listed Products
            </h3>
            {company.products.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {company.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-white p-6 text-center text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">
                This company has no products listed.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyProfile 