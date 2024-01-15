"use client"

import { useFormStatus } from "react-dom"

export default function SubmitTodo() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>Submit Todo</button>
  )
}
