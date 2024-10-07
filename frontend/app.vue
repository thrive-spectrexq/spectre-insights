<!-- frontend/app.vue -->

<template>
  <DefaultLayout>
    <NuxtPage />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import DefaultLayout from '~/layouts/default.vue'; // Import your default layout

const authStore = useAuthStore();

// Fetch user profile on app mount
authStore.initializeStore(); // Initialize store to get token from localStorage
if (authStore.token) {
  authStore.fetchUserProfile();
}

// Import global styles
import '~/assets/css/tailwind.css';
</script>

<style>
/* Global styles if any */
</style>
