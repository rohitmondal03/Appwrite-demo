"use server"

import { ID } from "appwrite";

import { env } from "@/env";
import { appWriteDb } from "@/lib/appwrite";


export async function addTodo(todo: string) {
  const response = await appWriteDb.createDocument(
    env.APPWRITE_DB,
    env.APPWRITE_COL,
    ID.unique(),
    todo,
  )
}