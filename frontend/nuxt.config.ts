// frontend/nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/axios',
    '@sidebase/nuxt-auth',
  ],
  build: {
    transpile: [],
  },
  css: [
    '@/assets/css/tailwind.css',
  ],
  runtimeConfig: {
    public: {
      axios: {
        apiBase: process.env.API_BASE || 'http://localhost:5000/api',
      },
      auth: {
        secret: process.env.AUTH_SECRET || 'your-auth-secret',
      },
    },
    auth: {
      secret: process.env.AUTH_SECRET || 'your-auth-secret',
    },
  },
  typescript: {
    strict: true,
  },
  plugins: [
    '~/plugins/auth.ts', // Ensure this is present
  ],
})
