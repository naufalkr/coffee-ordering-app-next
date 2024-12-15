// app/layout.tsx
import Image from 'next/image'
import './globals.css'
import Logo from '../../images/logo.png'
import {
  CrumpledPaperIcon,
  CardStackIcon
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { GlobalSearch } from '@/components/container/GlobalSearch'
import Link from "next/link"
import UserButton from './UserButton'
import Providers from './providers'

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <Providers>
          <header className="bg-gray-50 py-6">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <Link href="/">
                <Image src={Logo} width={200} height={200} alt="Fooedie eats" />
              </Link>
              <div className="flex items-center gap-6">
                <nav className="flex gap-8">
                  <GlobalSearch />
                  <Link 
                    href="/offers-for-you" 
                    className="text-gray-600 hover:text-black cursor-pointer flex gap-1 items-center"
                  >
                    <CrumpledPaperIcon />
                    Offers
                  </Link>
                </nav>
                <UserButton />
                <Link href="/cart" passHref>
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-black cursor-pointer flex gap-1 items-center"
                  >
                    <CardStackIcon />
                    Cart (0)
                  </Button>
                </Link>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 flex-grow">{children}</main>
          <footer className="mt-10 bg-gray-900 py-12">
            <div className="container mx-auto px-4 flex justify-between">
              <div className="flex gap-5 mr-4">
                <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                  <div>
                    <h3 className="text-white font-semibold mb-4">Company</h3>
                    <ul className="space-y-4">
                      <li>
                        <Link href="/about" className="text-gray-400 hover:text-white">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/careers" className="text-gray-400 hover:text-white">
                          Careers
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-4">Support</h3>
                    <ul className="space-y-4">
                      <li>
                        <Link href="/faq" className="text-gray-400 hover:text-white">
                          FAQ
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="text-gray-400 hover:text-white">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/help" className="text-gray-400 hover:text-white">
                          Help & Support
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms" className="text-gray-400 hover:text-white">
                          Terms & Conditions
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
