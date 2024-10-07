import { defineStore } from 'pinia';
import jwtDecode from 'jwt-decode'; // Ensure you have this library installed

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
        tokenExpiry: 0, // Token expiry timestamp in milliseconds
    }),
    getters: {
        isAuthenticated: (state) => !!state.token && Date.now() < state.tokenExpiry, // Check if token exists and is valid
        isAdmin: (state) => state.user?.role === 'admin', // Check if user is an admin
    },
    actions: {
        initializeStore() {
            if (process.client) {
                this.token = localStorage.getItem('token') || '';
                this.tokenExpiry = parseInt(localStorage.getItem('tokenExpiry') || '0', 10);
                
                // If token exists, fetch user profile
                if (this.token && Date.now() < this.tokenExpiry) {
                    this.fetchUserProfile();
                } else {
                    this.logout(); // Remove expired token
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
                const decodedToken: any = jwtDecode(this.token); // Decode JWT to get expiry
                
                // Calculate and store token expiry time
                this.tokenExpiry = decodedToken.exp * 1000; // Convert to milliseconds
                if (process.client) {
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('tokenExpiry', this.tokenExpiry.toString());
                }

                await this.fetchUserProfile();
            } catch (error) {
                console.error('Login failed:', error);
                if (error.response) {
                    // Differentiating error handling based on error response
                    throw new Error(error.response.data.message || 'Invalid email or password');
                } else {
                    throw new Error('Network error. Please try again later.');
                }
            }
        },
        async register(name: string, email: string, password: string) {
            try {
                const data = await useNuxtApp().$apiFetch('/users/register', {
                    method: 'POST',
                    body: JSON.stringify({ name, email, password }),
                });

                this.token = data.token;
                const decodedToken: any = jwtDecode(this.token); // Decode JWT to get expiry
                
                this.tokenExpiry = decodedToken.exp * 1000; // Convert to milliseconds
                if (process.client) {
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('tokenExpiry', this.tokenExpiry.toString());
                }

                await this.fetchUserProfile();
            } catch (error) {
                console.error('Registration failed:', error);
                if (error.response) {
                    throw new Error(error.response.data.message || 'Registration failed. Please try again.');
                } else {
                    throw new Error('Network error. Please try again later.');
                }
            }
        },
        async fetchUserProfile() {
            try {
                const data = await useNuxtApp().$apiFetch('/users/profile', {
                    method: 'GET',
                });
                this.user = data;
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                this.logout(); // In case of error, assume token might be invalid
                throw new Error('Failed to fetch user profile');
            }
        },
        logout() {
            this.token = '';
            this.user = null;
            this.tokenExpiry = 0;
            if (process.client) {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiry');
            }
        },
    },
});
