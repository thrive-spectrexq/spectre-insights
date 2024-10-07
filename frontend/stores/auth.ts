// frontend/stores/auth.ts
import { defineStore } from 'pinia';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: null as User | null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(email: string, password: string) {
            try {
                const { data } = await useFetch('/api/users/login', {
                    method: 'POST',
                    body: { email, password },
                    credentials: 'include', // If you're using cookies for authentication
                });

                this.token = data.value.token;
                localStorage.setItem('token', this.token);
                // Fetch user profile
                await this.fetchUserProfile();
            } catch (error) {
                throw error;
            }
        },
        async register(name: string, email: string, password: string) {
            try {
                const { data } = await useFetch('/api/users/register', {
                    method: 'POST',
                    body: { name, email, password },
                    credentials: 'include', // If you're using cookies for authentication
                });

                this.token = data.value.token;
                localStorage.setItem('token', this.token);
                // Fetch user profile
                await this.fetchUserProfile();
            } catch (error) {
                throw error;
            }
        },
        async fetchUserProfile() {
            try {
                const { data } = await useFetch('/api/users/profile', {
                    method: 'GET',
                    credentials: 'include', // If you're using cookies for authentication
                });

                this.user = data.value;
            } catch (error) {
                throw error;
            }
        },
        logout() {
            this.token = '';
            this.user = null;
            localStorage.removeItem('token');
        },
    },
});
