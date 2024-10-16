<template>
  <header class="bg-white shadow">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="text-xl font-bold text-indigo-600">Spectre Insights</NuxtLink>

      <!-- Hamburger Icon for Mobile -->
      <button @click="toggleMenu" class="text-gray-700 block md:hidden focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <!-- Navigation for larger screens -->
      <nav class="hidden md:flex space-x-4">
        <NuxtLink to="/services" class="text-gray-700 hover:text-indigo-600">Services</NuxtLink>
        <NuxtLink to="/blog" class="text-gray-700 hover:text-indigo-600">Blog</NuxtLink>
        <NuxtLink to="/contact" class="text-gray-700 hover:text-indigo-600">Contact</NuxtLink>
        <NuxtLink to="/about" class="text-gray-700 hover:text-indigo-600">About</NuxtLink>
        <NuxtLink to="/products" class="text-gray-700 hover:text-indigo-600">Products</NuxtLink>
        <NuxtLink to="/resources" class="text-gray-700 hover:text-indigo-600">Resources</NuxtLink>
        <NuxtLink to="/signin" class="text-gray-700 hover:text-indigo-600">Sign In</NuxtLink>
        <NuxtLink to="/signup" class="text-gray-700 hover:text-indigo-600">Create an Account</NuxtLink>
      </nav>

      <!-- Mobile Menu -->
      <nav v-if="isMenuOpen" class="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
        <div class="flex flex-col space-y-2 px-4 py-4">
          <NuxtLink @click="toggleMenu" to="/services" class="text-gray-700 hover:text-indigo-600">Services</NuxtLink>
          <NuxtLink @click="toggleMenu" to="/blog" class="text-gray-700 hover:text-indigo-600">Blog</NuxtLink>
          <NuxtLink @click="toggleMenu" to="/contact" class="text-gray-700 hover:text-indigo-600">Contact</NuxtLink>
          <NuxtLink @click="toggleMenu" to="/about" class="text-gray-700 hover:text-indigo-600">About</NuxtLink>
          <NuxtLink @click="toggleMenu" to="/products" class="text-gray-700 hover:text-indigo-600">Products</NuxtLink>
          <NuxtLink @click="toggleMenu" to="/resources" class="text-gray-700 hover:text-indigo-600">Resources</NuxtLink>
          <NuxtLink @click="toggleMenu" to="/signin" class="text-gray-700 hover:text-indigo-600">Sign In</NuxtLink>
          <NuxtLink @click="toggleMenu" to="/signup" class="text-gray-700 hover:text-indigo-600">Create an Account</NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
