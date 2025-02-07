'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { menuItems } from '@/lib/menuItems'
import Image from 'next/image'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'beverages']
  
  const filteredProducts = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imageLoadPromises = menuItems.map(item => {
          return new Promise((resolve, reject) => {
            const img = new window.Image()
            img.src = item.image
            img.onload = resolve
            img.onerror = reject
          })
        })

        await Promise.all(imageLoadPromises)
        setIsLoading(false)
      } catch (error) {
        console.error('Error preloading images:', error)
        setIsLoading(false)
      }
    }

    preloadImages()
  }, [])

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card p-4">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="heading-1 mb-8">Our Menu</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full capitalize ${
              activeCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((item) => (
          <div key={item._id} className="card p-4 hover:scale-105 transition-transform">
            <div className="relative aspect-square mb-4">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
            <h3 className="heading-3 mb-2">{item.name}</h3>
            <p className="text-text-light mb-4 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                ${item.price.toFixed(2)}
              </span>
              <button 
                onClick={() => handleAddToCart(item)}
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