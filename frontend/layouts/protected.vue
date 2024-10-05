<!-- frontend/layouts/protected.vue -->
<template>
    <div>
      <Navbar />
      <NuxtRouteAnnouncer />
      <NuxtPage />
      <Footer />
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
  })
  </script>
  
  <style scoped>
  /* Add any layout-specific styles here */
  </style>
  