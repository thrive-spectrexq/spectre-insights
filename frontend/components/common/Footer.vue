<!-- components/common/Footer.vue -->
<template>
    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <div>&copy; 2024 Spectre Insights. All Rights Reserved.</div>
          <div class="flex space-x-4">
            <nuxt-link to="/privacy-policy" class="hover:text-gray-400">Privacy Policy</nuxt-link>
            <nuxt-link to="/terms-of-service" class="hover:text-gray-400">Terms of Service</nuxt-link>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  footer {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  </style>
  