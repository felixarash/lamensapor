'use client'

import Image from 'next/image'
import { useState } from 'react'

type CartItemProps = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  onUpdateQuantity?: (id: string, newQuantity: number) => void
  onRemove?: (id: string) => void
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove
}: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useState(quantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setItemQuantity(newQuantity)
      onUpdateQuantity?.(id, newQuantity)
    }
  }

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-title">{name}</h3>
        <p className="cart-item-price">${price.toFixed(2)}</p>
        
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
            onClick={() => onRemove?.(id)}
            className="cart-remove-btn"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}