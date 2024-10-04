// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  build: {
    transpile: [],
  },
  css: [
    '@/assets/styles/main.scss',
  ],
  typescript: {
    strict: true,
  },
})
