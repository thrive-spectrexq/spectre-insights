<template>
  <footer class="bg-gray-800 text-gray-200 py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between">
        <!-- Company Info -->
        <div class="mb-6 md:mb-0">
          <h3 class="text-xl font-semibold">Spectre Insights</h3>
          <p class="mt-2">Harnessing the Power of AI and Technology</p>
        </div>
        <!-- Quick Links -->
        <div class="mb-6 md:mb-0">
          <h4 class="text-lg font-semibold mb-2">Quick Links</h4>
          <ul>
            <li class="mb-1">
              <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
            </li>
            <li class="mb-1">
              <NuxtLink to="/services" class="hover:underline">Services</NuxtLink>
            </li>
            <li class="mb-1">
              <NuxtLink to="/blog" class="hover:underline">Blog</NuxtLink>
            </li>
            <li class="mb-1">
              <NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink>
            </li>
            <li class="mb-1">
              <NuxtLink to="/resources" class="hover:underline">Resources</NuxtLink> <!-- New Resources Link -->
            </li>
            <li class="mb-1">
              <NuxtLink to="/terms-of-service" class="hover:underline">Terms of Service</NuxtLink>
            </li>
            <li class="mb-1">
              <NuxtLink to="/privacy-policy" class="hover:underline">Privacy Policy</NuxtLink>
            </li>
            <li class="mb-1">
              <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
            </li>
            <li class="mb-1">
              <NuxtLink to="/products" class="hover:underline">Products</NuxtLink>
            </li>
          </ul>
        </div>
        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-2">Contact Us</h4>
          <ul>
            <li class="mb-1 flex items-center">
              <svg class="h-5 w-5 mr-2 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@spectreinsights.net</span>
            </li>
            <li class="mb-1 flex items-center">
              <svg class="h-5 w-5 mr-2 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h2" />
              </svg>
              <span>+233 55 041-6018</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>&copy; {{ currentYear }} Spectre Insights. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
