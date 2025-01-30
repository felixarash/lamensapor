import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="heading-3 mb-4 text-primary dark:text-white">Lumen Sapor</h3>
            <p className="body-text dark:text-gray-300">
              Artisanal food and beverages crafted with passion and served with care.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-primary dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="nav-link dark:text-gray-300 hover:text-secondary">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="nav-link dark:text-gray-300 hover:text-secondary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="nav-link dark:text-gray-300 hover:text-secondary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary dark:text-white">Contact Us</h4>
            <ul className="space-y-2 body-text dark:text-gray-300">
              <li>123 Restaurant Street</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: hello@lumensapor.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary dark:text-white">Hours</h4>
            <ul className="space-y-2 body-text dark:text-gray-300">
              <li>Monday - Friday: 8am - 10pm</li>
              <li>Saturday: 9am - 11pm</li>
              <li>Sunday: 9am - 9pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              &copy; {new Date().getFullYear()} Lumen Sapor. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}