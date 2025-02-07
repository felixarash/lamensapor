'use client'

import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart, subtotal } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  })

  // Ensure we have a valid subtotal
  const total = subtotal || 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the order to your backend
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart and show success message
      clearCart()
      toast.success('Order placed successfully!')
      router.push('/shop/order-success')
    } catch (error) {
      toast.error('Failed to place order')
      console.error('Checkout error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="heading-1 mb-4">Your cart is empty</h1>
        <button 
          onClick={() => router.push('/menu')}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="heading-1 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="card p-6">
              <h2 className="heading-3 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full p-2 border rounded"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full p-2 border rounded"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                  />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="heading-3 mb-4">Delivery Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full p-2 border rounded"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        firstName: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full p-2 border rounded"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        lastName: e.target.value
                      }))}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    className="w-full p-2 border rounded"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: e.target.value
                    }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      className="w-full p-2 border rounded"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        city: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      required
                      className="w-full p-2 border rounded"
                      value={formData.postalCode}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        postalCode: e.target.value
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6">
            <h2 className="heading-3 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-text-light">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}