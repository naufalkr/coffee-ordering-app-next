"use client";

import { Button } from '../../components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function UserButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return (
      <Button
        onClick={() => signOut({ callbackUrl: "/logout" })}
        variant={"ghost"}
        className="text-gray-600 hover:text-black flex items-center gap-1 cursor-pointer"
      >
        Log Out
      </Button>
    );
  }

  return (
    <Link href="/login" passHref>
      <Button
        variant={"ghost"}
        className="text-gray-600 hover:text-black flex items-center gap-1 cursor-pointer"
      >
        Sign In
      </Button>
    </Link>
  );
}
