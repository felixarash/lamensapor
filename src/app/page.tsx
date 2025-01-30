import ProductGrid from '@/components/products/ProductGrid'
import Hero from '@/components/ui/Hero'

export default function Home() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            Featured Menu Items
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Discover our carefully curated selection of artisanal dishes and beverages, 
            crafted with locally sourced ingredients and served with passion.
          </p>
        </div>
        <ProductGrid />
      </section>
    </div>
  )
}