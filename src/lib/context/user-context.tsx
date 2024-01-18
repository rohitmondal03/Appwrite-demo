"use client"

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react'
import { ID, type Models } from 'appwrite';

import type { TLayoutProps } from 'types';
import { appwriteAccount } from '../appwrite';


type TAuthContext = {
  isSession: boolean;
  user: Models.User<Models.Preferences> | null;
  signUpUser: (email: string, password: string) => Promise<void>;
  logInUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}


export const AuthContext = createContext<TAuthContext | undefined>(undefined);


export default function UserContextProvider({ children }: TLayoutProps) {
  const [isSession, setSession] = useState(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const router = useRouter();


  // sign up user
  async function signUpUser(email: string, password: string) {
    const uId = ID.unique();

    await appwriteAccount.create(uId, email, password)
      .then(async () => await logInUser(email, password))
      .catch((error: Error) => alert(`Can't set session. ${error.message}`))
  }


  // log in user
  async function logInUser(email: string, password: string) {
    await appwriteAccount.createEmailSession(email, password)
      .then(async () => {
        const user = await appwriteAccount.get();
        setUser(user);
        setSession(true)
      })
      .catch((error: Error) => alert(`Can't set session. ${error.message}`))
  }


  // function to logout user
  async function logout() {
    await appwriteAccount.deleteSession("current")
      .then(() => {
        setSession(false);
        setUser(null);
        router.push("/")
      })
      .catch(err => alert(`Can't logout. ${err}`))
  }


  // init function
  async function fetchUserDetails() {
    try {
      const loggedIn = await appwriteAccount.get()
      setUser(loggedIn);
      setSession(true);
    } catch (err) {
      setUser(null);
      setSession(false);
    }
  }


  useEffect(() => {
    void fetchUserDetails();
    console.log("Current user details", user)
  }, [isSession, user])


  return (
    <AuthContext.Provider value={{
      isSession,
      user,
      signUpUser,
      logInUser,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
