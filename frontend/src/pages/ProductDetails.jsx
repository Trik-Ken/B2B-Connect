import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'

// In a real app, you would fetch this data based on the productId
const mockProduct = {
  id: 'eco-panels-123',
  name: 'Eco-Friendly Insulation Panels (Pack of 10)',
  category: 'Building Materials',
  price: 250.0,
  priceUnit: 'pack of 10 panels',
  description: 'These eco-friendly insulation panels are made from recycled cellulose, providing excellent thermal resistance and sustainability for your building projects. Easy to install and perfect for green construction.',
  images: [
    {
      id: 1,
      src: 'https://i.imgur.com/8p5O2cO.png',
      alt: 'Eco Panels Stack',
    },
    {
      id: 2,
      src: 'https://i.imgur.com/9vT3s3f.png',
      alt: 'Eco Panels Primary',
    },
    {
      id: 3,
      src: 'https://i.imgur.com/kH1s3yY.png',
      alt: 'Eco Panels Installation',
    },
  ],
  specifications: [
    { label: 'Material', value: 'Recycled Cellulose' },
    { label: 'R-Value per panel', value: 'R-15' },
    { label: 'Thickness per panel', value: '3.5 inches' },
    { label: 'Pack Size', value: '10 panels' },
  ],
  warranty: {
    title: 'Warranty & Returns',
    details: [
      'Warranty: 10-year manufacturer warranty',
      'Returns: 60-day return policy, conditions apply',
    ],
  },
  seller: {
    name: 'EcoBuild Supplies',
    profileUrl: '/seller/ecobuild',
    avatar: 'https://i.imgur.com/nJk2UaA.png',
  },
}

const ProductDetails = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  // Using mock data for now.
  const product = mockProduct

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const prevImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1,
    )
  }

  const nextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1,
    )
  }

  return (
    <div className="flex h-full flex-col bg-[#F0F4F8] dark:bg-gray-900">
      <header className="flex-shrink-0 px-5 pt-5 pb-3">
        <h1 className="text-center text-2xl font-bold text-blue-500">
          ConTrad
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-6 flex justify-center">
        <div className="w-full max-w-4xl" style={{ maxWidth: '70vw' }}>
          <div className="relative mb-4 flex flex-col items-center">
            <div className="w-full aspect-[4/3] bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex].src}
                alt={product.images[currentImageIndex].alt}
                className="object-contain max-h-[400px] w-auto h-auto mx-auto"
                style={{ maxWidth: '100%', maxHeight: '400px' }}
              />
            </div>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-800 shadow-md hover:bg-white dark:bg-gray-800/70 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-800 shadow-md hover:bg-white dark:bg-gray-800/70 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="mb-6 flex justify-center space-x-2 px-5">
            {product.images.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-12 w-12 overflow-hidden rounded-lg border-2 ${
                  index === currentImageIndex
                    ? 'border-blue-500'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  style={{ maxWidth: '48px', maxHeight: '48px' }}
                />
              </button>
            ))}
          </div>

          <div className="px-5">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h2>
              <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                {product.category}
              </span>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                ₹{product.price.toFixed(2)}{' '}
                <span className="text-lg font-normal text-gray-600 dark:text-gray-400">
                  / {product.priceUnit}
                </span>
              </p>
            </div>

            <div className="space-y-6 rounded-lg bg-white p-5 shadow-sm dark:bg-gray-800">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
              </div>
              <hr className="dark:border-gray-700" />
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
                  Specifications
                </h3>
                <div className="space-y-2 text-sm">
                  {product.specifications.map(spec => (
                    <div key={spec.label} className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">{spec.label}:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="dark:border-gray-700" />

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
                  {product.warranty.title}
                </h3>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {product.warranty.details.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>

              <hr className="dark:border-gray-700" />

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
                  Sold By
                </h3>
                <div className="flex items-center space-x-3">
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="h-12 w-12 rounded-full bg-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {product.seller.name}
                    </p>
                    <Link
                      to={product.seller.profileUrl}
                      className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                      View company profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate(`/chat/ecobuild-supplies`, { state: { prefill: `I'm interested in the product: ${product.name}` } })}
                className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <MessageSquare size={20} />
                <span>Contact Seller</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails 