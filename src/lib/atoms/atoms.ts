import { atom } from "jotai";
import { Models } from "appwrite"

import type { TUserDetails } from "types";


export const isSessionPresent = atom(false)
export const userDetails = atom<TUserDetails | null>(null);