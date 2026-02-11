import cors from '@elysiajs/cors'
import Elysia from 'elysia'
import { auth } from './lib/auth'

const authMacro = new Elysia({ name: 'auth' }).mount(auth.handler).macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      })
      if (!session) return status(401)
      return {
        user: session.user,
        session: session.session,
      }
    },
  },
})

export const app = new Elysia({ prefix: '/api' })
  .use(
    cors({
      origin: process.env.NEXT_PUBLIC_URL!,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'cookie'],
      credentials: true,
    })
  )
  .use(authMacro)
  .get('/hello', () => ({
    message: 'Hello World',
    date: new Date(),
  }))
  // protected route example
  .get(
    '/user',
    ({ user }) => ({
      user,
    }),
    {
      auth: true,
    }
  )

// generic types
export type App = typeof app
