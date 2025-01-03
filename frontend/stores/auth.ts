// stores/auth.ts
import jwt from 'jsonwebtoken'; // Install `jsonwebtoken` for token generation
import { defineStore } from 'pinia';
import useMongoClient from '~/plugins/mongo';

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
        isAdmin: (state) => state.user?.role === 'admin',
    },
    actions: {
        async initializeStore() {
            if (process.client) {
                this.token = localStorage.getItem('token') || '';
                if (this.token) {
                    try {
                        await this.fetchUserProfile();
                    } catch (error) {
                        console.error('Failed to initialize user profile:', error);
                        this.logout(); // Clear invalid token
                    }
                }
            }
        },
        async login(email: string, password: string) {
            try {
                const mongoClient = await useMongoClient();
                const usersCollection = mongoClient.db('frontendDB').collection('users');

                // Find user in the database
                const user = await usersCollection.findOne({ email, password }); // Ensure passwords are hashed in production
                if (!user) {
                    throw new Error('Invalid email or password.');
                }

                // Generate JWT token
                this.token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

                // Persist token to localStorage
                if (process.client) {
                    localStorage.setItem('token', this.token);
                }

                // Set user data
                this.user = user;
            } catch (error) {
                console.error('Login Error:', error);
                throw new Error('Failed to login. Please try again.');
            }
        },
        async register(name: string, email: string, password: string) {
            try {
                const mongoClient = await useMongoClient();
                const usersCollection = mongoClient.db('frontendDB').collection('users');

                // Check if the email already exists
                const existingUser = await usersCollection.findOne({ email });
                if (existingUser) {
                    throw new Error('Email already in use.');
                }

                // Insert new user into MongoDB
                const result = await usersCollection.insertOne({
                    name,
                    email,
                    password, // Ensure passwords are hashed in production
                    role: 'user',
                });

                const newUser: User = {
                    _id: result.insertedId.toString(),
                    name,
                    email,
                    role: 'user',
                };

                // Generate JWT token
                this.token = jwt.sign({ userId: newUser._id, role: newUser.role }, 'your-secret-key', { expiresIn: '1h' });

                // Persist token to localStorage
                if (process.client) {
                    localStorage.setItem('token', this.token);
                }

                // Set user data
                this.user = newUser;
            } catch (error) {
                console.error('Registration Error:', error);
                throw new Error('Failed to register. Please try again.');
            }
        },
        async fetchUserProfile() {
            try {
                if (!this.token) {
                    throw new Error('No token found. Please login.');
                }

                // Decode token to get user ID
                const decodedToken: any = jwt.verify(this.token, 'your-secret-key');
                const userId = decodedToken.userId;

                // Fetch user from MongoDB
                const mongoClient = await useMongoClient();
                const usersCollection = mongoClient.db('frontendDB').collection('users');
                const user = await usersCollection.findOne({ _id: userId });

                if (!user) {
                    throw new Error('User not found.');
                }

                this.user = user;
            } catch (error) {
                console.error('Fetch Profile Error:', error);
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
