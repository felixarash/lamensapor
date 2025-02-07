'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

type CartContextType = {
  items: CartItem[]
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  removeItem: (id: string) => void;
  subtotal: number
}

const CartContext = createContext<CartContextType>({
  items: [],
  isCartOpen: false,
  setIsCartOpen: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  removeItem: () => {},
  subtotal: 0
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [subtotal, setSubtotal] = useState(0)

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(`cart-${session?.user?.email || 'guest'}`)
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
        calculateSubtotal(parsedCart)
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
  }, [session])

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`cart-${session?.user?.email || 'guest'}`, JSON.stringify(items))
      calculateSubtotal(items)
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }, [items, session])

  const calculateSubtotal = (cartItems: CartItem[]) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setSubtotal(total)
  }

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsCartOpen(true)
    toast.success('Added to cart')
  }

  const removeFromCart = (itemId: string) => {
    setItems(prev => {
      const newItems = prev.filter(item => item.id !== itemId)
      const newSubtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      setSubtotal(newSubtotal)
      return newItems
    })
    toast.success('Removed from cart')
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId)
      return
    }
    
    setItems(prev => {
      const newItems = prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity }
          : item
      )
      const newSubtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      setSubtotal(newSubtotal)
      return newItems
    })
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem(`cart-${session?.user?.email || 'guest'}`)
    toast.success('Cart cleared')
  }

  return (
    <CartContext.Provider value={{
      items,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      removeItem: removeFromCart,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}