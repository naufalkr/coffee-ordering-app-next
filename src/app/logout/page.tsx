"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await signOut({ redirect: false }); // Logout tanpa langsung redirect
      router.push("/login"); // Redirect ke halaman login setelah logout
    };

    logout();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Logging out...</h1>
        <p className="mt-2 text-gray-500">
          You will be redirected to the login page shortly.
        </p>
      </div>
    </div>
  );
}
