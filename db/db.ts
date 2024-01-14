import { appWriteDb } from "@/lib/appwrite";

export function db() {
  const promise = appWriteDb.listDocuments("65a35e7136e0f4843a70", "65a35e92450e2fa9989a")

  promise
    .then(resp => console.log(resp))
    .catch((error: Error) => alert(error.message))
}