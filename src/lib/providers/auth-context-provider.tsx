"use client"

import type { TLayoutProps } from "types"
import UserContextProvider from "../context/user-context"

export default function AuthContextProvider({children}: TLayoutProps) {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}
