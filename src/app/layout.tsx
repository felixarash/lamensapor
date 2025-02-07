import { Inter } from 'next/font/google'
import { CartProvider } from '@/contexts/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartSidebar from '@/components/cart/CartSidebar'
import { Providers } from '@/components/providers/Providers'
import '@/app/globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata = {
  title: 'LamenSapor',
  description: 'Artisanal food and beverages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <CartProvider>
              <main className="flex-1">{children}</main>
              <CartSidebar />
              <Footer />
              <Toaster position="top-right" />
            </CartProvider>
          </div>
        </Providers>
      </body>
    </html>
  )
}