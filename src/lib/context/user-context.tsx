import { createContext, useEffect } from 'react'
import { useAtom } from 'jotai';
import { ID } from 'appwrite';

import type { TLayoutProps, TUserDetails } from 'types';
import { isSessionPresent, userDetails } from '../atoms/atoms';
import { appwriteAccount } from '../appwrite';


type TAuthContext = {
  isSession: boolean;
  user: TUserDetails | null;
  signUpUser: (email: string, password: string) => void;
  logInUser: (email: string, password: string) => void;
}


export const AuthContext = createContext<TAuthContext | undefined>(undefined);


export default function UserContext({ children }: TLayoutProps) {
  const [isSession, setSession] = useAtom(isSessionPresent);
  const [user, setUser] = useAtom(userDetails);


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


  // init function
  async function fetchUserDetails() {
    try {
      const loggedIn = await appwriteAccount.get()
      setSession(loggedIn.$id ? true : false);
    } catch (error) {
      alert(`Cant get information. ${error}`)
    }
  }


  useEffect(() => {
    fetchUserDetails();
  }, [])


  return (
    <AuthContext.Provider value={{
      isSession,
      user,
      signUpUser,
      logInUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
