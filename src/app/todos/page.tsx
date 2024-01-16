"use client"

import { redirect, useRouter } from "next/navigation";
import { useRef } from "react";
import { ID } from "appwrite";

import { useAuth } from "@/hooks/use-auth"
import { env } from "@/env";
import { appWriteDb } from "@/lib/appwrite";


export default function ToDosPage() {
  const { isSession, user } = useAuth();
  const { push } = useRouter();
  const input = useRef<HTMLInputElement | null>(null)

  if (!isSession) {
    redirect("/log-in")
  }


  async function addTodo(todo: any) {
    await appWriteDb.createDocument(
      env.NEXT_PUBLIC_APPWRITE_DB_ID,
      env.NEXT_PUBLIC_APPWRITE_COL_ID,
      ID.unique(),
      todo,
    )
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err))
  }


  return (
    <section>
      <form onSubmit={(e) => {
        e.preventDefault();
        addTodo({ todo: input.current?.value, userId: user.$id })}
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
