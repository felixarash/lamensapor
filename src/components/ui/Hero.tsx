'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <div className="bg-background py-20">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">
            Experience the Art of Fine Dining
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover our carefully crafted menu featuring fresh, locally-sourced ingredients
            and artisanal beverages.
          </p>
          <div className="space-x-4">
            <Link
              href="/menu"
              className="btn-primary"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}