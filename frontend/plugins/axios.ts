// frontend/plugins/axios.ts

import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '@/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();

    nuxtApp.$axios.onRequest((config) => {
        const token = authStore.token;
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    });

    nuxtApp.$axios.onError((error) => {
        const code = parseInt(error.response?.status);
        if (code === 401) {
            authStore.logout();
        }
        return Promise.reject(error);
    });
});
