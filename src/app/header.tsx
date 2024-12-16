'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/container/GlobalSearch";
import { CrumpledPaperIcon, CardStackIcon } from "@radix-ui/react-icons";
import UserButton from './UserButton'
import Logo from "../../images/logo.png";

// import Logo from '../../images/logo.png

export default function Header() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === "admin@admin.com";

  return (
    <header className="bg-gray-50 py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <Image src={Logo} width={200} height={200} alt="Fooedie eats" />
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-8">
            <GlobalSearch />
            <Link href="/offers-for-you" className="text-gray-600 hover:text-black cursor-pointer flex gap-1 items-center">
              <CrumpledPaperIcon />
              Offers
            </Link>
          </nav>
          <UserButton />
          <Link href="/cart" passHref>
            <Button variant="ghost" className="text-gray-600 hover:text-black cursor-pointer flex gap-1 items-center">
              <CardStackIcon />
              Cart
            </Button>
          </Link>

          {/* Admin only buttons */}
          {isAdmin && (
            <>
              <Link href="/menu" passHref>
                <Button variant="ghost" className="text-gray-600 hover:text-black cursor-pointer flex gap-1 items-center">
                  <CardStackIcon />
                  Menu
                </Button>
              </Link>
              <Link href="/order" passHref>
                <Button variant="ghost" className="text-gray-600 hover:text-black cursor-pointer flex gap-1 items-center">
                  <CardStackIcon />
                  Order
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}