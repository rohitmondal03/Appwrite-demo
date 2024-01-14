import { useAtom } from "jotai";

import { isUserLoggedIn } from "@/lib/atoms/atoms";


export function useAuth() {
  const [isLoggedIn, setUserLoggedIn] = useAtom(isUserLoggedIn);

  return {
    isSession: isLoggedIn,
    changeSession: setUserLoggedIn
  }
}