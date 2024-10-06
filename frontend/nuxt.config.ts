// frontend/nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-10-05',
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  build: {
    transpile: [], // Add any packages here that need transpiling
  },
  css: [
    '@/assets/css/tailwind.css',
  ],
  runtimeConfig: {
    public: {
      API_BASE_URL: 'http://localhost:5000/api', // API base URL
    },
  },
  typescript: {
    strict: true,
  },
  plugins: [
    '~/plugins/auth.ts',
    '~/plugins/axios.ts',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
