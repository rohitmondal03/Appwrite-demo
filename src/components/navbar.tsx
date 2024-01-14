"use client"

import { useRouter } from "next/navigation"

import { appwriteAccount } from "@/lib/appwrite";
import { useAuth } from "@/hooks/use-auth"


export default function Navbar() {
  const { isSession, changeSession } = useAuth();
  const { push } = useRouter();


  // function to logout user
  function logout() {
    const promise = appwriteAccount.deleteSession("current");

    promise
      .then(() => {
        changeSession(false)
        push("/")
      })
      .catch(err => alert(`can't logout. ${err}`,));
  }


  return (
    <nav className="border-b-2 border-black p-5 flex flex-row items-center justify-between">
      <h1>Appwrite demo</h1>


      <div>
        {isSession ? (
          <button onClick={logout}>Sign out</button>
        ) : (
          <button onClick={() => push("/log-in")}>Sign In</button>
        )}
      </div>
    </nav>
  )
}
