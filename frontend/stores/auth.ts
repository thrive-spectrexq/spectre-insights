// frontend/stores/auth.ts

import { defineStore } from 'pinia';
import axios from 'axios';

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
                const response = await axios.post('/api/users/login', { email, password });
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
                // Fetch user profile
                await this.fetchUserProfile();
            } catch (error) {
                throw error;
            }
        },
        async register(name: string, email: string, password: string) {
            try {
                const response = await axios.post('/api/users/register', { name, email, password });
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
                // Fetch user profile
                await this.fetchUserProfile();
            } catch (error) {
                throw error;
            }
        },
        async fetchUserProfile() {
            try {
                const response = await axios.get('/api/users/profile');
                this.user = response.data;
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
