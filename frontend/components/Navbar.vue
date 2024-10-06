<template>
    <nav class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <nuxt-link to="/" class="text-xl font-bold text-indigo-600">Spectre Insights</nuxt-link>
        <div class="space-x-6">
          <nuxt-link to="/services" class="text-gray-700 hover:text-indigo-600">Services</nuxt-link>
          <nuxt-link to="/blog" class="text-gray-700 hover:text-indigo-600">Blog</nuxt-link>
          <nuxt-link to="/products" class="text-gray-700 hover:text-indigo-600">Product</nuxt-link>
          <nuxt-link to="/about" class="text-gray-700 hover:text-indigo-600">About</nuxt-link>
          <nuxt-link to="/contact" class="text-gray-700 hover:text-indigo-600">Contact</nuxt-link>
          <!-- Add more links or authentication buttons as needed -->
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  // No script needed for static navbar
  </script>
  
  <style scoped>
  /* Add any additional styles if necessary */
  </style>
  