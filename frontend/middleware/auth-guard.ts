// frontend/middleware/auth-guard.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app'
//import { useAuth } from '@sidebase/nuxt-auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  //  const auth = useAuth()

  try {
    // Check if the user is authenticated
    const isAuthenticated = await auth.isAuthenticated()

    // If the user is not authenticated, redirect them to the login page
    if (!isAuthenticated) {
      return navigateTo({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  } catch (error) {
    console.error('Error checking authentication:', error)
    // Optionally, redirect to an error page or the login page
    return navigateTo('/login')
  }

  // If the user is authenticated, proceed to the route
})
