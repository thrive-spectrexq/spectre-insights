// frontend/stores/user.ts
import { defineStore } from 'pinia'
import axios from 'axios'

interface UserProfile {
  id: string
  name: string
  email: string
  // Add more fields as necessary
}

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as UserProfile | null,
  }),
  actions: {
    async fetchUserProfile() {
      try {
        const response = await axios.get('/api/user/profile') // Adjust the endpoint
        this.profile = response.data
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    },
    async updateUserProfile(updatedProfile: Partial<UserProfile>) {
      try {
        const response = await axios.put('/api/user/profile', updatedProfile) // Adjust the endpoint
        this.profile = response.data
      } catch (error) {
        console.error('Error updating user profile:', error)
      }
    },
  },
})
