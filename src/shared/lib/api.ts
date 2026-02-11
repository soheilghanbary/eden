import { treaty } from '@elysiajs/eden'
import { createAuthClient } from 'better-auth/react'
import type { App } from '@/app/api/[[...route]]/route'

const baseURL =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

export const api = treaty<App>(baseURL).api

// auth client
export const { signIn, signUp, useSession } = createAuthClient()
