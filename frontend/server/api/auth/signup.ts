// frontend/server/api/auth/signup.ts
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event)

  // TODO: Implement user creation logic (e.g., save to database)

  // Mock response
  return {
    user: {
      id: '1',
      name,
      email,
    },
    token: 'mock-jwt-token',
  }
})
