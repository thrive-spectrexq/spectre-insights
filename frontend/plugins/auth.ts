// frontend/plugins/auth.ts

import { useAuthStore } from '@/stores/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore();

    // Check if the user is authenticated and fetch the user profile
    if (authStore.token) {
        try {
            // Fetch user profile using the store's method
            await authStore.fetchUserProfile();
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            authStore.logout();
        }
    }
});
