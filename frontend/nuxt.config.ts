// frontend/nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-10-05',
  
  // Modules you are using
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  // Build configurations
  build: {
    transpile: [], // Add any packages here that need transpiling
  },

  // CSS files you are including globally
  css: [
    '@/assets/css/tailwind.css',
  ],

  // Runtime configuration to handle environment variables
  runtimeConfig: {
    public: {
      // Dynamic API base URL from .env files
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5000/api', // Default to localhost for development
    },
  },

  // TypeScript configurations
  typescript: {
    strict: true, // Enable strict TypeScript rules
  },

  // Plugins to be used globally
  plugins: [
    '~/plugins/auth.ts',
    '~/plugins/axios.ts',
  ],

  // PostCSS plugins
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
