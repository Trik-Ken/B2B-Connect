import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'

const EditableProductCard = ({ product, onEdit }) => {
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(`Product ${product.id} deleted.`)
      // In a real app, you'd also remove it from the state
    }, 1000)
  }

  if (isDeleting) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-red-50 p-4 text-sm text-red-700">
        Deleting product...
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
      <div className="p-4">
        <div className="flex space-x-4">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
            {product.image || product.primaryImage ? (
              <img
                src={product.image || product.primaryImage}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-center text-xs font-semibold text-gray-400">
                {product.imagePlaceholder || product.title}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">{product.title}</h3>
            <p className="text-sm text-gray-600">
              ₹{product.price.toFixed(2)} / {product.priceUnit}
            </p>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600">{product.description}</p>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center space-x-2 rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300"
          >
            <Pencil size={14} />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditableProductCard 