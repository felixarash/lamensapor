'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()

  const cartItemsCount = cartItems?.length || 0

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            LamenSapor
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/menu" className="nav-link hover:text-primary">
              Menu
            </Link>
            <Link href="/shop/products" className="nav-link hover:text-primary">
              Shop
            </Link>
            
            {session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-primary">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    {session.user?.name?.[0]}
                  </div>
                  <span>{session.user?.name}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link 
                    href="/shop/account" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <Link 
                    href="/shop/orders" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/signin" className="nav-link hover:text-primary">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            <Link href="/shop/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-primary" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/menu" 
                className="nav-link hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                href="/shop/products" 
                className="nav-link hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              {session ? (
                <>
                  <Link 
                    href="/shop/account" 
                    className="nav-link hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link 
                    href="/shop/orders" 
                    className="nav-link hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="nav-link text-left hover:text-primary"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/signin" 
                    className="nav-link hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="nav-link hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <Link 
                href="/shop/cart" 
                className="nav-link hover:text-primary flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}