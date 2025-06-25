import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Trash2,
  Upload,
  X,
  PlusCircle,
  Pencil,
} from 'lucide-react'

// In a real app, you would fetch this data
const mockProduct = {
  id: 'prod_1',
  name: 'Advanced AI Processor Unit',
  category: 'Electronics',
  price: 499.99,
  priceUnit: 'unit',
  description:
    'State-of-the-art AI processor for demanding applications. Features high computational...',
  primaryImage: 'https://i.imgur.com/example.png', // Placeholder
  additionalImages: [],
}

const EditProduct = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(mockProduct)
  const [primaryImage, setPrimaryImage] = useState(null)
  const [additionalImages, setAdditionalImages] = useState([])

  const handlePrimaryImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setPrimaryImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleAdditionalImagesChange = e => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 6)
      const newImages = files.map(file => URL.createObjectURL(file))
      setAdditionalImages(newImages)
    }
  }

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <header className="flex-shrink-0 px-5 pt-5 pb-3">
        <h1 className="text-center text-2xl font-bold text-blue-500">
          ConTrad
        </h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update the details for {product.name}. Upload a primary image and
              up to 6 additional images from your device (max 7 total images,
              5MB per image).
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <h3 className="mb-3 font-semibold text-gray-800">
                Primary Product Image
              </h3>
              <div className="flex items-center space-x-4">
                {primaryImage && (
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <img
                      src={primaryImage}
                      alt="Primary"
                      className="h-full w-full rounded-md object-cover"
                    />
                    <button
                      onClick={() => setPrimaryImage(null)}
                      className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <label className="flex cursor-pointer items-center space-x-2 rounded-md border px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100">
                  <Upload size={16} />
                  <span>Choose file</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePrimaryImageChange}
                  />
                </label>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Upload the main image for your product from your device (max
                5MB).
              </p>
            </div>

            <div className="rounded-lg bg-white p-5 shadow-sm">
              <h3 className="mb-3 font-semibold text-gray-800">
                Additional Product Images (Up to 6)
              </h3>
              <div className="flex items-center space-x-4">
                <label className="flex cursor-pointer items-center space-x-2 rounded-md border px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100">
                  <Upload size={16} />
                  <span>Choose files</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImagesChange}
                  />
                </label>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {additionalImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Additional ${index + 1}`}
                      className="h-24 w-full rounded-md object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 rounded-lg bg-blue-600 py-3 font-bold text-white shadow-md transition-colors hover:bg-blue-700">
                Save Changes
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 rounded-lg border bg-white py-3 font-bold text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct 