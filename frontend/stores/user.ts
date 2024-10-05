// frontend/stores/user.ts
import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

interface UserProfile {
  id: string
  name: string
  email: string
  // Add more fields as needed
}

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as UserProfile | null,
  }),
  actions: {
    async fetchUserProfile() {
      const { $axios } = useNuxtApp()
      try {
        const response = await $axios.get('/user/profile') // Adjust the endpoint as needed
        this.profile = response.data
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    },
    setUserProfile(profile: UserProfile) {
      this.profile = profile
    },
    clearUserProfile() {
      this.profile = null
    },
  },
})
