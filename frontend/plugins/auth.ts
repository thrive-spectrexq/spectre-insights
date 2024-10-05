// frontend/plugins/auth.ts
import { defineNuxtPlugin } from '#app'
import { useAuth } from '@sidebase/nuxt-auth'
import { useUserStore } from '~/stores/user'

export default defineNuxtPlugin(() => {
  const auth = useAuth()
  const userStore = useUserStore()

  // Watch for authentication state changes
  auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      userStore.setUser(session.user)
    } else {
      userStore.clearUser()
    }
  })

  // Initialize user state on app start
  if (auth.session?.user) {
    userStore.setUser(auth.session.user)
  }
})
