<template>
  <header class="bg-white shadow">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold text-indigo-600">Spectre Insights</NuxtLink>
      <nav>
        <!-- <NuxtLink to="/" class="mx-2 text-gray-700 hover:text-indigo-600">Home</NuxtLink> -->
        <NuxtLink to="/services" class="mx-2 text-gray-700 hover:text-indigo-600">Services</NuxtLink>
        <NuxtLink to="/blog" class="mx-2 text-gray-700 hover:text-indigo-600">Blog</NuxtLink>
        <NuxtLink to="/contact" class="mx-2 text-gray-700 hover:text-indigo-600">Contact</NuxtLink>
        <NuxtLink to="/about" class="mx-2 text-gray-700 hover:text-indigo-600">About</NuxtLink>
        <NuxtLink to="/products" class="mx-2 text-gray-700 hover:text-indigo-600">Products</NuxtLink>
        <NuxtLink to="/resources" class="mx-2 text-gray-700 hover:text-indigo-600">Resources</NuxtLink> <!-- New Resources Link -->
        <NuxtLink to="/signin" class="mx-2 text-gray-700 hover:text-indigo-600">Sign In</NuxtLink>
        <NuxtLink to="/signup" class="mx-2 text-gray-700 hover:text-indigo-600">Create an Account</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// No script needed for static content
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
