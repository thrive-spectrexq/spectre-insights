import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-10-05',

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  build: {
    transpile: [],
  },

  css: [
    '@/assets/css/tailwind.css',
  ],

  runtimeConfig: {
    public: {
      MONGO_URI: process.env.MONGO_URI,
    },
  },

  typescript: {
    strict: true,
  },

  plugins: [
    '~/plugins/mongo.ts', // Plugin for connecting to the MongoDB database
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
