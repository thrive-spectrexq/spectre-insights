// frontend/server/api/auth/reset-password.ts
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  // TODO: Implement password reset request logic (e.g., send email with token)

  // Mock response
  return {
    message: 'Password reset link has been sent to your email.',
  }
})
