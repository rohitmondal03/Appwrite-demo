"use client"

import { redirect } from "next/navigation";

import { useAuth } from "@/hooks/use-auth"
import { addTodo } from "@/actions/add-todos";
import SubmitTodo from "@/components/buttons/submit-todo";


export default function ToDosPage() {
  const { isSession } = useAuth();

  if (!isSession) redirect("/sign-up")

  return (
    <section>
      <form action={() => addTodo("hello")}>
        form
      </form>
      <SubmitTodo />
    </section>
  )
}
