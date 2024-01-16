"use client"

import { useRouter } from 'next/navigation';
import { createContext, useEffect } from 'react'
import { useAtom } from 'jotai';
import { ID, Models } from 'appwrite';

import type { TLayoutProps, TUserDetails } from 'types';
import { isSessionPresent, userDetails } from '../atoms/atoms';
import { appwriteAccount } from '../appwrite';


type TAuthContext = {
  isSession: boolean;
  // user: TUserDetails;
  user: Models.User<Models.Preferences>;
  signUpUser: (email: string, password: string) => void;
  logInUser: (email: string, password: string) => void;
  logout: () => void;
}


export const AuthContext = createContext<TAuthContext | undefined>(undefined);


export default function UserContextProvider({ children }: TLayoutProps) {
  const [isSession, setSession] = useAtom(isSessionPresent);
  const [user, setUser] = useAtom(userDetails);
  const { push } = useRouter();


  // sign up user
  async function signUpUser(email: string, password: string) {
    const uId = ID.unique();

    await appwriteAccount.create(uId, email, password)
      .then(async () => await logInUser(email, password))
      .catch((error: Error) => alert(`Can't set session. ${error}`))
  }


  // log in user
  async function logInUser(email: string, password: string) {
    await appwriteAccount.createEmailSession(email, password)
      .then(async () => {
        const user = await appwriteAccount.get();
        setUser(user);
        setSession(true)
      })
      .catch((error: Error) => alert(`Can't set session. ${error}`))
  }


  // function to logout user
  async function logout() {
    await appwriteAccount.deleteSession("current")
      .then(() => {
        setSession(false);
        setUser(null);
        push("/")
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
    fetchUserDetails();
    console.log(user)
  }, [isSession])


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
