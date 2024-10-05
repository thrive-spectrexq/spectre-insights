// frontend/server/api/auth/signin.ts
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  // TODO: Implement user authentication logic (e.g., verify credentials)

  // Mock authentication
  if (email === 'user@example.com' && password === 'password') {
    return {
      user: {
        id: '1',
        name: 'John Doe',
        email: 'user@example.com',
      },
      token: 'mock-jwt-token',
    }
  } else {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }
})
