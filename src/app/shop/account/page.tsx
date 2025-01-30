'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AccountPage() {
  const router = useRouter()

  useEffect(() => {
    // Add authentication check here
    const isAuthenticated = false // Replace with actual auth check
    if (!isAuthenticated) {
      router.push('/signin')
    }
  }, [router])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <p>Sign in to view your account details</p>
    </div>
  )
}