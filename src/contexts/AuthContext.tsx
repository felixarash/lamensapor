'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { client } from '@/lib/sanity'

interface AuthContextType {
  user: unknown
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (userData: Record<string, any>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Query Sanity for user
      const user = await client.fetch(
        `*[_type == "user" && email == $email][0]`,
        { email }
      )

      if (!user) {
        throw new Error('User not found')
      }

      // In production, use proper password hashing
      if (user.password !== password) {
        throw new Error('Invalid password')
      }

      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/shop/account')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/')
  }

  const signup = async (userData: Record<string, any>) => {
    try {
      // Create user in Sanity
      const newUser = await client.create({
        _type: 'user',
        ...userData,
        createdAt: new Date().toISOString()
      })

      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      router.push('/shop/account')
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}