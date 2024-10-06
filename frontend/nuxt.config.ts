// frontend/nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-10-05',
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'vue-toastification/nuxt',
  ],
  build: {
    transpile: [],
  },
  css: [
    'leaflet/dist/leaflet.css',
    '@/assets/css/tailwind.css',
  ],
  runtimeConfig: {
    axios: {
      proxy: true,
      credentials: true,
    },
    proxy: {
      '/api/': { target: 'http://localhost:5000', pathRewrite: { '^/api/': '/api/' } },
    },
  },
  typescript: {
    strict: true,
  },
  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/auth.ts'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
