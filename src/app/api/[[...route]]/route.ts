import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'
import { auth } from '@/server/lib/auth'

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

export const app = new Elysia({ prefix: 'api' })
  .use(
    cors({
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'cookie'],
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

export const GET = app.fetch
export const POST = app.fetch
export const PUT = app.fetch
export const PATCH = app.fetch
export const DELETE = app.fetch

// generic types
export type App = typeof app
