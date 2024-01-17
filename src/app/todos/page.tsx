"use client"

import { useRouter } from "next/navigation";
import { useRef } from "react";

import { useAuth } from "@/hooks/use-auth"
import { addTodo } from "@/lib/functions/add-todo";


export default function ToDosPage() {
  const { isSession, user } = useAuth();
  const router = useRouter();
  const input = useRef<HTMLInputElement | null>(null)

  if (!isSession) {
    router.push("/log-in")
  }


  return (
    <section>
      <form onSubmit={async (e) => {
        e.preventDefault();
        await addTodo({ todo: input.current?.value, userId: String(user?.$id) })}
      }>
        form
        <input ref={input} type="text" placeholder="enter todo..." />

        <button style={{ border: "2px solid black" }} type="submit">
          Add todo
        </button>
      </form>

    </section>
  )
}
