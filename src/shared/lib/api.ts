import { treaty } from '@elysiajs/eden'
import { createAuthClient } from 'better-auth/react'
import { app } from '@/app/api/[[...route]]/route'

export const api =
  // process is defined on server side and build time
  typeof process !== 'undefined'
    ? treaty(app).api
    : treaty<typeof app>('localhost:3000').api

// auth client
export const { signIn, signUp, useSession } = createAuthClient()
