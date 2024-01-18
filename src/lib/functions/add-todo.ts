import { ID } from "appwrite";

import { appWriteDb } from "@/lib/appwrite";
import { env } from "@/env";


export async function addTodo(todo: Omit<Document, keyof Document>) {
  await appWriteDb.createDocument(
    env.NEXT_PUBLIC_APPWRITE_DB_ID,
    env.NEXT_PUBLIC_APPWRITE_COL_ID,
    ID.unique(),
    todo,
  )
    .then((resp) => {
      console.log("Successfully created Todo with ID ", resp.$id);
    })
    .catch((err) => console.log(err))
}