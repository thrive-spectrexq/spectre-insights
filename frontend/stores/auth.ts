import { defineStore } from 'pinia';

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
    },
    actions: {
        initializeStore() {
            if (process.client) { // Check if running in client
                this.token = localStorage.getItem('token') || '';
                // Optionally, fetch user profile if token exists
                if (this.token) {
                    this.fetchUserProfile();
                }
            }
        },
        async login(email: string, password: string) {
            try {
                const data = await useNuxtApp().$apiFetch('/users/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                });

                this.token = data.token;
                if (process.client) { // Check if running in client
                    localStorage.setItem('token', this.token);
                }
                await this.fetchUserProfile();
            } catch (error) {
                throw error;
            }
        },
        async register(name: string, email: string, password: string) {
            try {
                const data = await useNuxtApp().$apiFetch('/users/register', {
                    method: 'POST',
                    body: JSON.stringify({ name, email, password }),
                });

                this.token = data.token;
                if (process.client) { // Check if running in client
                    localStorage.setItem('token', this.token);
                }
                await this.fetchUserProfile();
            } catch (error) {
                throw error;
            }
        },
        async fetchUserProfile() {
            try {
                const data = await useNuxtApp().$apiFetch('/users/profile', {
                    method: 'GET',
                });
                this.user = data;
            } catch (error) {
                throw error;
            }
        },
        logout() {
            this.token = '';
            this.user = null;
            if (process.client) { // Check if running in client
                localStorage.removeItem('token');
            }
        },
    },
});
