import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, RefreshCw, X, ArrowLeft } from 'lucide-react'
import EditableProductCard from '../components/EditableProductCard'
import Toast from '../components/Toast'
import AddProductModal from '../components/AddProductModal'
import EditProductModal from '../components/EditProductModal'
import {
  companyInfo,
  listedProducts as initialProducts,
  productCategories,
} from '../data/mockData'

const ManageCompany = () => {
  const navigate = useNavigate()
  const [company, setCompany] = useState(companyInfo)
  const [products, setProducts] = useState(initialProducts)
  const [logoPreview, setLogoPreview] = useState(company.logo)
  const [showToast, setShowToast] = useState(false)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleLogoChange = e => {
    if (e.target.files && e.target.files[0]) {
      const newLogoUrl = URL.createObjectURL(e.target.files[0])
      setLogoPreview(newLogoUrl)
      setCompany(prev => ({ ...prev, logo: newLogoUrl }))
    }
  }

  const handleSave = () => {
    Object.assign(companyInfo, company)
    console.log('Company details saved:', companyInfo)
    setShowToast(true)
  }

  const handleAddProduct = newProduct => {
    if (
      newProduct.category &&
      !productCategories.includes(newProduct.category)
    ) {
      productCategories.push(newProduct.category)
    }
    initialProducts.unshift(newProduct)
    setProducts([...initialProducts])
    setAddModalOpen(false)
  }

  const handleEditProduct = product => {
    setEditingProduct(product)
    setEditModalOpen(true)
  }

  const handleSaveProduct = updatedProduct => {
    if (
      updatedProduct.category &&
      !productCategories.includes(updatedProduct.category)
    ) {
      productCategories.push(updatedProduct.category)
    }

    const productIndex = initialProducts.findIndex(
      p => p.id === updatedProduct.id,
    )
    if (productIndex !== -1) {
      initialProducts[productIndex] = updatedProduct
      setProducts([...initialProducts])
    }
    setEditModalOpen(false)
    setEditingProduct(null)
  }

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <header className="flex flex-shrink-0 items-center space-x-4 border-b bg-white px-4 py-3 shadow-sm">
        <button onClick={() => navigate('/profile/settings')} className="p-1">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Manage Company & Products
        </h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Edit Company Details */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              Edit Company Details
            </h2>
            <p className="mt-1 mb-6 text-sm text-gray-500">
              Update your company's information. Click "Save Company Details"
              to apply changes.
            </p>

            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-2 h-24 w-24 rounded-full bg-gray-100">
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="h-full w-full rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="flex space-x-3">
                  <label className="flex cursor-pointer items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                    <RefreshCw size={14} />
                    <span>Change Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </label>
                  <button
                    onClick={() => setLogoPreview(null)}
                    className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-800"
                  >
                    <X size={14} />
                    <span>Remove Logo</span>
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  PNG, JPG, GIF up to 5MB.
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={company.name}
                  onChange={e =>
                    setCompany({ ...company, name: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={company.description}
                  onChange={e =>
                    setCompany({ ...company, description: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="4"
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={company.address}
                  onChange={e =>
                    setCompany({ ...company, address: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={company.email}
                  onChange={e =>
                    setCompany({ ...company, email: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={company.phone}
                  onChange={e =>
                    setCompany({ ...company, phone: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  GST Number
                </label>
                <input
                  type="text"
                  value={company.gst}
                  onChange={e =>
                    setCompany({ ...company, gst: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white shadow-md transition-colors hover:bg-blue-700"
              >
                Save Company Details
              </button>
            </div>
          </div>

          {/* Manage Products */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              Manage Products
            </h2>
            <p className="mt-1 mb-6 text-sm text-gray-500">
              Add new products or edit existing ones. Upload primary and
              additional images directly from your device.
            </p>
            <button
              onClick={() => setAddModalOpen(true)}
              className="mb-6 flex w-full items-center justify-center space-x-2 rounded-lg bg-gray-200 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-300"
            >
              <PlusCircle size={20} />
              <span>Add New Product</span>
            </button>
            <div className="space-y-4">
              {products.map(product => (
                <EditableProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <Toast
          title="Company Details Updated"
          message="Your company information has been saved."
          onClose={() => setShowToast(false)}
        />
      )}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
      {editingProduct && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveProduct}
          product={editingProduct}
        />
      )}
    </div>
  )
}

export default ManageCompany 