import { useState, useRef, useEffect } from 'react'
import { Upload, X } from 'lucide-react'
import { productCategories } from '../data/mockData'

const EditProductModal = ({ isOpen, onClose, onSave, product }) => {
  const [productData, setProductData] = useState(product)
  const [primaryImage, setPrimaryImage] = useState(null)
  const [additionalImages, setAdditionalImages] = useState([])
  const modalRef = useRef()

  useEffect(() => {
    if (product) {
      setProductData(product)
      setPrimaryImage(product.primaryImage || product.image)
      setAdditionalImages(product.additionalImages || [])
    }
  }, [product])

  if (!isOpen || !product) return null

  const handleInputChange = (e, field) => {
    setProductData({ ...productData, [field]: e.target.value })
  }

  const handlePrimaryImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setPrimaryImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleAdditionalImagesChange = e => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 6)
      setAdditionalImages(
        files.map(file => URL.createObjectURL(file)),
      )
    }
  }

  const handleSubmit = () => {
    const updatedProduct = {
      ...productData,
      title: productData.name,
      image: primaryImage,
      primaryImage: primaryImage,
      additionalImages: additionalImages,
    }
    onSave(updatedProduct)
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
          Edit Product
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Update the details for {product.title}. Upload a primary image and up
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
                        htmlFor="primary-file-upload-edit"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="primary-file-upload-edit"
                          name="primary-file-upload-edit"
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
                    htmlFor="additional-file-upload-edit"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="additional-file-upload-edit"
                      name="additional-file-upload-edit"
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
                value={productData.title || ''}
                onChange={e =>
                  setProductData({ ...productData, title: e.target.value })
                }
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Category (Optional)
              </label>
              <input
                type="text"
                list="categories-edit"
                value={productData.category || ''}
                onChange={e =>
                  setProductData({ ...productData, category: e.target.value })
                }
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Select or type a category"
              />
              <datalist id="categories-edit">
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
              value={productData.description || ''}
              onChange={e =>
                setProductData({ ...productData, description: e.target.value })
              }
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
                value={productData.price || 0}
                onChange={e =>
                  setProductData({ ...productData, price: e.target.value })
                }
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Per Unit Quantity
              </label>
              <input
                type="text"
                value={productData.priceUnit || ''}
                onChange={e =>
                  setProductData({ ...productData, priceUnit: e.target.value })
                }
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Specifications
            </label>
            <textarea
              value={
                Array.isArray(productData.specifications)
                  ? productData.specifications.join('\n')
                  : productData.specifications || ''
              }
              onChange={e =>
                setProductData({
                  ...productData,
                  specifications: e.target.value,
                })
              }
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
              value={productData.warranty || ''}
              onChange={e =>
                setProductData({ ...productData, warranty: e.target.value })
              }
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Return Policy
            </label>
            <input
              type="text"
              value={productData.returnPolicy || ''}
              onChange={e =>
                setProductData({
                  ...productData,
                  returnPolicy: e.target.value,
                })
              }
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProductModal 