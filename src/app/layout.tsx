import Header from "./header";
import "./globals.css";
import Providers from "./providers";
import Link from "next/link";

export const metadata = {
  title: "Next.js App Router + NextAuth + Tailwind CSS",
  description: "A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
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
  );
}