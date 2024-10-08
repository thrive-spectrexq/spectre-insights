// plugins/axios.ts
import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '@/stores/auth';
import { useRuntimeConfig } from '#app'; // Import useRuntimeConfig

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();
    const config = useRuntimeConfig(); // Access runtime config

    // Function to make requests
    const apiFetch = async (url: string, options = {}) => {
        // Make sure to access the token from the store
        const token = authStore.token;

        // Add authorization header if token exists
        const headers: HeadersInit = {
            ...options.headers,
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Make the fetch request
        const response = await fetch(`${config.public.API_BASE_URL}${url}`, { // Use runtime config
            ...options,
            headers,
        });

        // Check if response is ok (status in the range 200-299)
        if (!response.ok) {
            const error = await response.json();
            // Handle 401 Unauthorized
            if (response.status === 401) {
                authStore.logout();
            }
            throw new Error(error.message || 'An error occurred');
        }

        // Return the response data as JSON
        return response.json();
    };

    // Provide the apiFetch method to the app
    nuxtApp.provide('apiFetch', apiFetch);
});
