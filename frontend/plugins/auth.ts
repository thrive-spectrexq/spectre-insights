// frontend/plugins/auth.ts

import { useAuthStore } from '@/stores/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore();
    if (authStore.token) {
        try {
            await authStore.fetchUserProfile();
        } catch (error) {
            authStore.logout();
        }
    }
});
