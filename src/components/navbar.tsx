"use client"

import { useRouter } from "next/navigation"

import { useAuth } from "@/hooks/use-auth"


export default function Navbar() {
  const { isSession, logout } = useAuth();
  const router = useRouter();


  return (
    <nav className="border-b-2 border-black p-5 flex flex-row items-center justify-between">
      <h1>Appwrite demo</h1>


      <div>
        {isSession ? (
          <button onClick={logout}>Sign out</button>
        ) : (
          <button onClick={() => router.push("/sign-up")}>Sign In</button>
        )}
      </div>
    </nav>
  )
}
