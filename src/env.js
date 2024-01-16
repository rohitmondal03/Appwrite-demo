import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";


export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  client: {
    NEXT_PUBLIC_APPWRITE_DB_ID: z.string(),
    NEXT_PUBLIC_APPWRITE_COL_ID: z.string(),
    NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string(),
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    NEXT_PUBLIC_APPWRITE_DB_ID: process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
    NEXT_PUBLIC_APPWRITE_COL_ID: process.env.NEXT_PUBLIC_APPWRITE_COL_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
