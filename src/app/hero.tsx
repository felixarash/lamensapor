import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-primary dark:text-white mb-6">
              Experience the Art of Fine Dining
            </h1>
            <p className="text-lg text-text-light dark:text-gray-300 mb-8">
              Discover our carefully crafted menu featuring fresh, locally-sourced 
              ingredients and artisanal beverages served in an elegant atmosphere.
            </p>
            <div className="space-x-4">
              <Link 
                href="/menu" 
                className="btn-primary"
              >
                View Menu
              </Link>
              <Link 
                href="/reservations" 
                className="btn-secondary"
              >
                Make Reservation
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="Restaurant ambiance"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}