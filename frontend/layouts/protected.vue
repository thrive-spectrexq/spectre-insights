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
import { definePageMeta } from 'nuxt/dist/pages/runtime';
import Header from '~/components/Header.vue';

// Define the middleware to protect this layout
definePageMeta({
  middleware: 'auth',
});
</script>

<style scoped>
/* Add any layout-specific styles here */
</style>
