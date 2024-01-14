import { appwriteAccount } from "@/lib/appwrite";


export async function userDetails() {
  const promise = appwriteAccount.getSession("current");

  return promise
    .then((resp) => resp)
    .catch(() => null)
}