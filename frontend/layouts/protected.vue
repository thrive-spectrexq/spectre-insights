<!-- frontend/layouts/protected.vue -->
<template>
    <div>
      <Header />
      <NuxtRouteAnnouncer />
      <NuxtPage />
      <Footer />
    </div>
  </template>
  
  <script setup lang="ts">
import Header from '~/components/Header.vue';

  definePageMeta({
    middleware: 'auth',
  })
  </script>
  
  <style scoped>
  /* Add any layout-specific styles here */
  </style>
  