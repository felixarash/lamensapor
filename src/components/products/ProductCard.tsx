'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type ProductCardProps = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category?: string
}

export default function ProductCard({ id, name, description, price, image, category }: ProductCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true)

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Link href={`/products/${id}`} className="block relative aspect-square">
        <div className={`
          absolute inset-0 bg-gray-200 dark:bg-gray-700
          ${isImageLoading ? 'animate-pulse' : 'hidden'}
        `} />
        <Image
          src={image}
          alt={name}
          fill
          className={`
            object-cover group-hover:scale-105 transition-transform duration-500
            ${isImageLoading ? 'opacity-0' : 'opacity-100'}
          `}
          onLoadingComplete={() => setIsImageLoading(false)}
        />
        {category && (
          <span className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 text-sm rounded-full">
            {category}
          </span>
        )}
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${id}`}>
          <h3 className="text-lg font-serif font-semibold mb-2 text-primary dark:text-white group-hover:text-secondary transition-colors duration-200">
            {name}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary dark:text-white font-semibold">
            ${price.toFixed(2)}
          </span>
          <button 
            onClick={() => {/* Add to cart functionality */}}
            className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}