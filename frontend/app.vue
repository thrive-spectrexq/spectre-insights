<!-- frontend/app.vue -->

<template>
  <DefaultLayout>
    <NuxtPage />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import DefaultLayout from '~/layouts/default.vue'; // Import your default layout
import { onMounted } from 'vue';

const authStore = useAuthStore();

// Fetch user profile on app mount
onMounted(async () => {
  // Initialize store to get token from localStorage
  authStore.initializeStore(); 
  
  // Fetch user profile if token exists
  if (authStore.token) {
    try {
      await authStore.fetchUserProfile();
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Optionally, handle the error (e.g., redirect to login page)
    }
  }
});

// Import global styles
import '~/assets/css/tailwind.css';
</script>

<style>
/* Global styles if any */
</style>
