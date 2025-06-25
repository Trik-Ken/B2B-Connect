import { Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const currencySymbol = product.currency || '₹'
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  // A simple way to generate a placeholder from the title
  const imagePlaceholder = product.title
    .split(' ')
    .map(w => w[0])
    .join('')
    .substring(0, 3)

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="relative flex aspect-square w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
        <span className="text-xl font-semibold text-gray-400 dark:text-gray-500">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            imagePlaceholder
          )}
        </span>
      </div>
      <div className="p-3">
        <h3 className="mb-1 truncate text-base font-bold text-gray-800 dark:text-white">
          {product.title}
        </h3>
        <p className="mb-2 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-blue-600 dark:text-blue-500">
            {currencySymbol}
            {product.price.toFixed(2)}
          </p>
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <Package size={14} />
            <span>/ {product.unit || 'unit'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 