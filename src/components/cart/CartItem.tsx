'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

interface CartItemProps {

  id: string;

  name: string;

  price: number;

  quantity: number;

  image?: string;

}


export default function CartItem({
  id,
  name,
  price,
  quantity,
  image,
}: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const [itemQuantity, setItemQuantity] = useState(quantity)
  const [isImageLoading, setIsImageLoading] = useState(true)

  // Update local state when prop changes
  useEffect(() => {
    setItemQuantity(quantity)
  }, [quantity])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setItemQuantity(newQuantity)
      updateQuantity(id, newQuantity)
    }
  }

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
        )}
        <Image
          src={image || '/placeholder.jpg'}
          alt={name}
          fill
          className={`object-cover ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoadingComplete={() => setIsImageLoading(false)}
        />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-title">{name}</h3>
        <p className="cart-item-price">${(price * itemQuantity).toFixed(2)}</p>
        
        <div className="flex items-center gap-4 mt-2">
          <div className="cart-quantity-controls">
            <button
              onClick={() => handleQuantityChange(itemQuantity - 1)}
              className="cart-quantity-btn rounded-l-lg"
            >
              -
            </button>
            <span className="cart-quantity-text">
              {itemQuantity}
            </span>
            <button
              onClick={() => handleQuantityChange(itemQuantity + 1)}
              className="cart-quantity-btn rounded-r-lg"
            >
              +
            </button>
          </div>
          
          <button
            onClick={() => removeFromCart(id)}
            className="cart-remove-btn"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}