"use client"

import { useState } from "react";

import { signIn } from "@/lib/functions/sign-in";


export default function HomePage() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })


  return (
    <section>
      <form onSubmit={(e) => {
        e.preventDefault();
        signIn(user.email, user.password);
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

        <button type="submit">Sign IN</button>
      </form>
    </section>
  );
}
