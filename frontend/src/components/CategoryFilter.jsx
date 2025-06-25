import { useState } from 'react'

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  const handleSelect = category => {
    if (onSelectCategory) {
      onSelectCategory(category)
    }
  }

  return (
    <div className="overflow-x-auto py-2">
      <div className="-mx-4 flex space-x-3 px-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleSelect(category)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeCategory === category
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter 