'use client'

import { menuItems } from '@/lib/menuItems'
import { useState } from 'react'

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Use menuItems instead of products
  const categories = ['all', ...new Set(menuItems.map(item => item.category))]
  
  const filteredProducts = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  return (
    <div className="container-custom py-16">
      <h1 className="heading-1 mb-8">Our Menu</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
              ? 'bg-primary text-white'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((item) => (
          <div key={item._id} className="card p-4 hover:scale-105 transition-transform">
            <div className="relative aspect-square mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
            <h3 className="heading-3 mb-2">{item.name}</h3>
            <p className="text-text-light mb-4 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                ${item.price.toFixed(2)}
              </span>
              <button 
                onClick={() => {
                  // Add to cart functionality will be implemented
                }}
                className="btn-secondary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}