'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import CartItem from './CartItem'

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen } = useCart()
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-800 shadow-lg transform ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-200 ease-in-out z-50`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text dark:text-white">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <span className="sr-only">Close cart</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {items.map(item => (
                <CartItem
                  key={item.id}
                  {...item}
                />
              ))}
            </div>

            {items.length === 0 && (
              <p className="text-center text-text-light dark:text-gray-400">
                Your cart is empty
              </p>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-text dark:text-white">Total</span>
                <span className="text-lg font-bold text-primary dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Link 
                href="/shop/checkout"
                onClick={() => setIsCartOpen(false)}
                className="btn-secondary w-full text-center block"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}