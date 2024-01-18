import { useState } from "react";

import { addTodo } from "@/lib/functions/add-todo";
import { useAuth } from "@/hooks/use-auth";


export default function ToDosForm() {
  const { user } = useAuth();
  const [input, setInput] = useState<string>();

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await addTodo({ todo: input, userId: user?.$id })
    }}>
      form
      <input type="text" placeholder="Enter todo..."
        value={input} onChange={(e) => setInput(e.target.value)}
      />

      <button style={{ border: "2px solid black" }} type="submit">
        Add todo
      </button>
    </form>
  )
}
