"use client"

import { useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { appwriteAccount } from "@/lib/appwrite";
import { redirect, useRouter } from "next/navigation";


export default function LogInPage() {
  const { isSession, changeSession } = useAuth();
  const { push } = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  // session present ==> redirect
  if (isSession) redirect("/todos");


  // login user
  function login(email: string, password: string) {
    const promise = appwriteAccount.createEmailSession(email, password);

    promise
      .then(() => changeSession(true))
      .catch((error) => alert(error))
  }


  return (
    <section className="flex items-center justify-between">
      <div className="w-[50%] h-screen bg-slate-600" />

      <form
        className="w-[50%] px-10 flex flex-col space-y-10"
        onSubmit={(e) => {
          e.preventDefault();
          login(user.email, user.password)
        }}
      >
        <h1 className="text-3xl font-bold">Welcome back User</h1>

        <div className="space-x-3">
          <input type="email" name="email" id="email" placeholder="enter email"
            value={user.email} onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
            className="border-2 border-gray-600/70 p-2 rounded-lg"
          />

          <input type="password" name="password" id="password" placeholder="enter password"
            value={user.password} onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
            className="border-2 border-gray-600/70 p-2 rounded-lg"
          />
          <button>Log In</button>
        </div>
      </form>
    </section>
  )
}
