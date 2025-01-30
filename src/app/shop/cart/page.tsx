'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="heading-1 mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center">
          <p className="body-text mb-8">Your cart is empty</p>
          <Link href="/menu" className="btn-primary">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="card p-4">
                  <div className="cart-item">
                    <div className="cart-item-image">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">{item.name}</h3>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="cart-quantity-controls">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="cart-quantity-btn rounded-l-lg"
                          >
                            -
                          </button>
                          <span className="cart-quantity-text">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="cart-quantity-btn rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="cart-remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="heading-3 mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-text-light">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light">Delivery</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Link 
                href="/shop/checkout" 
                className="btn-secondary w-full text-center"
              >
                Proceed to Checkout
              </Link>
              <button 
                onClick={clearCart}
                className="mt-4 text-red-500 hover:text-red-600 text-sm text-center w-full"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}