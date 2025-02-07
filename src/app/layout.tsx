import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartSidebar from '@/components/cart/CartSidebar'
import { CartProvider } from '@/contexts/CartContext'
import { Toaster } from 'react-hot-toast'
import '@/app/globals.css'

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
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <CartSidebar />
            <Footer />
          </div>
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  )
}