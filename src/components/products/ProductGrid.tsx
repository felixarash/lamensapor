'use client'

import { featuredItems } from '@/lib/featuredItems'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      {featuredItems.map((product) => (
        <ProductCard 
          key={product._id}
          id={product._id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          category={product.category}
        />
      ))}
    </div>
  )
}