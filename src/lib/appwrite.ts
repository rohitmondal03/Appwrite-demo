import { Account, Client, Databases } from 'appwrite';

import { env } from '@/env';


const appwriteClient = new Client();

export const appwriteAccount = new Account(appwriteClient);
export const appWriteDb= new Databases(appwriteClient);

appwriteClient
  .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
