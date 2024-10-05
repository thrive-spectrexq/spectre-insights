// frontend/middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuth } from '@sidebase/nuxt-auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()

  // Check if the user is authenticated
  const isAuthenticated = await auth.isAuthenticated()

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    // Optionally, pass the intended route for post-login redirection
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }

  // If the user is authenticated, proceed to the route
})
