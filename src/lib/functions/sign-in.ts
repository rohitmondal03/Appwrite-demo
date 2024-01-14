import { ID } from "appwrite"

import { appwriteAccount } from "@/lib/appwrite"


export function signIn(email: string, password: string) {
  const uId = ID.unique();
  const promise = appwriteAccount.create(uId, email, password);

  promise
    .then(resp => console.log(resp))
    .catch((error: Error) => alert(error.message))
}