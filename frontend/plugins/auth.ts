// frontend/plugins/auth.ts

import { defineNuxtPlugin } from '#app'
import { useAuth as useSidebaseAuth } from '@sidebase/nuxt-auth'

export default defineNuxtPlugin((nuxtApp) => {
    const auth = useSidebaseAuth()

    // Extend the auth composable with an updateProfile method
    const updateProfile = async (data: { name: string; email: string; password?: string }) => {
        try {
            // Assuming your backend has an endpoint to update user profiles
            const response = await nuxtApp.$axios.put('/user/profile', data)
            // Refresh the auth state to get updated user data
            await auth.refreshUser()
            return response.data
        } catch (error) {
            throw error
        }
    }

    return {
        provide: {
            auth: {
                ...auth,
                updateProfile,
            },
        },
    }
})
