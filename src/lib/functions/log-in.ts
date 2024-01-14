import { appwriteAccount } from "@/lib/appwrite";


export function login(email: string, password: string) {
  const promise = appwriteAccount.createEmailSession(email, password);

  promise
    .then(() => console.log("logged..."))
    .catch((error:Error) => alert(error.message))
}