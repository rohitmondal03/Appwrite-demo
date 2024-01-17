"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/hooks/use-auth"
import { addTodo } from "@/lib/functions/add-todo";


export default function ToDosPage() {
  const { isSession, user } = useAuth();
  const router = useRouter();
  const [input, setInput]= useState<string>()

  if (!isSession) {
    router.push("/log-in")
  }


  return (
    <section>
      <form onSubmit={async (e) => {
        e.preventDefault();
        await addTodo({ todo: input, userId: user?.$id})}
      }>
        form
        <input type="text" placeholder="enter todo..." 
          value={input} onChange={(e) => setInput(e.target.value)}
        />

        <button style={{ border: "2px solid black" }} type="submit">
          Add todo
        </button>
      </form>
    </section>
  )
}
