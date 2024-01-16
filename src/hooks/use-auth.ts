import { useAtom } from "jotai";

import { isSessionPresent } from "@/lib/atoms/atoms";


export function useAuth() {
  const [isSession, setSession] = useAtom(isSessionPresent);

  return {
    isSession: isSession,
    changeSession: setSession
  }
}