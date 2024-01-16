import { AuthContext } from "@/lib/context/user-context";
import { useContext } from "react";


export function useAuth() {
  const sessionContext= useContext(AuthContext);

  if(!sessionContext) {
    throw new Error("useAuth must be wrapped in a UserContextProvider.")
  }

  return sessionContext;
}