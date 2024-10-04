// frontend/nuxt.config.ts
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/axios"],
  build: {
    transpile: [],
  },
  css: ["@/assets/css/tailwind.css"],
  runtimeConfig: {
    public: {
      axios: {
        apiBase: process.env.API_BASE || "http://localhost:5000/api",
      },
    },
    // Add private runtime config here if needed
  },
  typescript: {
    strict: true,
  },
});
