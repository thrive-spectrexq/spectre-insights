// stores/auth.ts
import { defineStore } from 'pinia';
import { useRuntimeConfig } from '#app'; // Import useRuntimeConfig

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        user: null as User | null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.user?.role === 'admin', // New admin check
    },
    actions: {
        initializeStore() {
            if (process.client) {
                this.token = localStorage.getItem('token') || '';
                if (this.token) {
                    this.fetchUserProfile();
                }
            }
        },
        async login(email: string, password: string) {
            const config = useRuntimeConfig(); // Access runtime config
            try {
                const data = await useNuxtApp().$apiFetch(`${config.public.API_BASE_URL}/users/login`, { // Use runtime config
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                });
                this.token = data.token;
                if (process.client) {
                    localStorage.setItem('token', this.token);
                }
                await this.fetchUserProfile();
            } catch (error) {
                console.error("Login Error:", error);
                throw new Error('Failed to login. Please check your credentials.');
            }
        },
        async register(name: string, email: string, password: string) {
            const config = useRuntimeConfig(); // Access runtime config
            try {
                const data = await useNuxtApp().$apiFetch(`${config.public.API_BASE_URL}/users/register`, { // Use runtime config
                    method: 'POST',
                    body: JSON.stringify({ name, email, password }),
                });
                this.token = data.token;
                if (process.client) {
                    localStorage.setItem('token', this.token);
                }
                await this.fetchUserProfile();
            } catch (error) {
                console.error("Registration Error:", error);
                throw new Error('Failed to register. Please try again.');
            }
        },
        async fetchUserProfile() {
            const config = useRuntimeConfig(); // Access runtime config
            try {
                const data = await useNuxtApp().$apiFetch(`${config.public.API_BASE_URL}/users/profile`, { // Use runtime config
                    method: 'GET',
                });
                this.user = data;
            } catch (error) {
                console.error("Fetch Profile Error:", error);
                throw new Error('Failed to fetch user profile.');
            }
        },
        logout() {
            this.token = '';
            this.user = null;
            if (process.client) {
                localStorage.removeItem('token');
            }
        },
    },
});
