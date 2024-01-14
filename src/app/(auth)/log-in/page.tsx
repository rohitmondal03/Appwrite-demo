"use client"

import { useState } from "react";

import { login } from "@/lib/functions/log-in";


export default function LogInPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  return (
    <section>
      <form onSubmit={(e) => {
        e.preventDefault();
        login(user.email, user.password)
      }}>
        <input type="email" name="email" id="email" placeholder="enter email"
          value={user.email} onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
        />

        <input type="password" name="password" id="password" placeholder="enter password"
          value={user.password} onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
        />
        <button>Log In</button>
      </form>
    </section>
  )
}
