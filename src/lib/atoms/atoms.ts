import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils"

export const isUserLoggedIn = atomWithStorage("userLoggedIn", false)
