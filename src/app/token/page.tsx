"use client";

import { useSession } from "next-auth/react";

export default function Example() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Not signed in</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.firstName || "User"}</h1>
      <p>Your JWT Token:</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
