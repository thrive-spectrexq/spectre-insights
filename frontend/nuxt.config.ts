// frontend/nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-10-05',
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    //    '@sidebase/nuxt-auth',
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
        apiBase: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:5000/api',
      },
      strapi: {
        baseURL: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api',
      },
      // Removed auth.secret from public
    },
    auth: {
      secret: process.env.AUTH_SECRET || 'your-auth-secret',
    },
  },
  typescript: {
    strict: true,
  },
  plugins: [
    '~/plugins/axios.ts',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
