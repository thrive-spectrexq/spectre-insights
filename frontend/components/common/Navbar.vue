<!-- components/common/Navbar.vue -->
<template>
    <nav class="bg-blue-600 text-white">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-xl font-bold">
          <nuxt-link to="/">Spectre Insights</nuxt-link>
        </div>
        <ul class="flex space-x-4">
          <li>
            <nuxt-link to="/" class="hover:text-blue-300">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/blog" class="hover:text-blue-300">Blog</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/products" class="hover:text-blue-300">Products</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/services" class="hover:text-blue-300">Services</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/about" class="hover:text-blue-300">About</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/contact" class="hover:text-blue-300">Contact</nuxt-link>
          </li>
        </ul>
        <div>
          <nuxt-link to="/login" class="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700">Login</nuxt-link>
          <nuxt-link to="/signup" class="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700 ml-2">Sign Up</nuxt-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  nav {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  