"use client"

import { useState } from "react";
import { ID } from "appwrite"

import { appwriteAccount } from "@/lib/appwrite"
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";


export default function SigninPage() {
  const { isSession, signUpUser } = useAuth();
  const { push } = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })


  if (isSession) push("/todos")


  return (
    <section>
      <form onSubmit={(e) => {
        e.preventDefault();
        signUpUser(user.email, user.password);
      }}>
        <input
          type="text"
          placeholder="email..."
          value={user.email}
          onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
        />

        <input
          type="password"
          placeholder="password..."
          value={user.password}
          onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
        />

        <button type="submit">
          Sign In
        </button>
      </form>
    </section>
  )
}
