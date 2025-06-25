import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { productCategories, listedProducts } from '../data/mockData'

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    priceUnit: 'unit',
    category: '',
    specifications: '',
    warranty: '',
    returnPolicy: '',
  })
  const [primaryImage, setPrimaryImage] = useState(null)
  const [additionalImages, setAdditionalImages] = useState([])
  const modalRef = useRef()

  if (!isOpen) return null

  const handleInputChange = (e, field) => {
    setProduct({ ...product, [field]: e.target.value })
  }

  const handlePrimaryImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setPrimaryImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleAdditionalImagesChange = e => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 6)
      setAdditionalImages(files.map(file => URL.createObjectURL(file)))
    }
  }

  const handleSubmit = () => {
    const newProduct = {
      id: `prod_${Date.now()}`,
      title: product.name,
      description: product.description,
      price: parseFloat(product.price),
      priceUnit: product.priceUnit,
      category: product.category || 'Uncategorized',
      imagePlaceholder: product.name,
      specifications: product.specifications,
      warranty: product.warranty,
      returnPolicy: product.returnPolicy,
      primaryImage: primaryImage,
      additionalImages: additionalImages,
    }
    onAddProduct(newProduct)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={e => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose()
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </button>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Add New Product
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Enter the details for your new product. Upload a primary image and up
          to 6 additional images from your device (max 7 total images, 5MB per
          image).
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">
              Primary Product Image
            </h3>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {primaryImage ? (
                  <div className="relative">
                    <img
                      src={primaryImage}
                      alt="Primary preview"
                      className="mx-auto h-32 w-32 object-cover"
                    />
                    <button
                      onClick={() => setPrimaryImage(null)}
                      className="absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="primary-file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="primary-file-upload"
                          name="primary-file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handlePrimaryImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">
              Additional Product Images (Up to 6)
            </h3>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="additional-file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="additional-file-upload"
                      name="additional-file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleAdditionalImagesChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 5MB each
                </p>
              </div>
            </div>
            {additionalImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {additionalImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Additional preview ${index + 1}`}
                      className="h-24 w-full rounded-md object-cover"
                    />
                    <button
                      onClick={() =>
                        setAdditionalImages(
                          additionalImages.filter((_, i) => i !== index),
                        )
                      }
                      className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                placeholder="e.g., Super Widget Model X"
                value={product.name}
                onChange={e => handleInputChange(e, 'name')}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Category (Optional)
              </label>
              <input
                type="text"
                list="categories"
                value={product.category}
                onChange={e => handleInputChange(e, 'category')}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Select or type a category"
              />
              <datalist id="categories">
                {productCategories
                  .filter(c => c !== 'All')
                  .map(cat => (
                    <option key={cat} value={cat} />
                  ))}
              </datalist>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Product Description
            </label>
            <textarea
              placeholder="Detailed product description, features, benefits..."
              value={product.description}
              onChange={e => handleInputChange(e, 'description')}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              rows="4"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Price (₹)
              </label>
              <input
                type="number"
                value={product.price}
                onChange={e => handleInputChange(e, 'price')}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Per Unit Quantity
              </label>
              <input
                type="text"
                placeholder="unit"
                value={product.priceUnit}
                onChange={e => handleInputChange(e, 'priceUnit')}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Specifications
            </label>
            <textarea
              placeholder="Enter each specification on a new line. e.g., Color: Red"
              value={product.specifications}
              onChange={e => handleInputChange(e, 'specifications')}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Warranty Information
            </label>
            <input
              type="text"
              placeholder="Standard 1-year warranty."
              value={product.warranty}
              onChange={e => handleInputChange(e, 'warranty')}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Return Policy
            </label>
            <input
              type="text"
              placeholder="30-day return policy, see terms for details."
              value={product.returnPolicy}
              onChange={e => handleInputChange(e, 'returnPolicy')}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-lg border bg-white px-4 py-2 font-bold text-gray-700 shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white shadow-md"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddProductModal 