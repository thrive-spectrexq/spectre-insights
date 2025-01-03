<!-- frontend/app.vue -->
<template>
  <DefaultLayout>
    <NuxtPage />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import DefaultLayout from '~/layouts/default.vue'; // Import your default layout
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

// Fetch user profile on app mount
onMounted(async () => {
  authStore.initializeStore(); 

  if (authStore.token && !authStore.user) { // Avoid redundant API calls
    try {
      await authStore.fetchUserProfile();
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      authStore.logout(); // Clear token if profile fetch fails
      window.location.href = '/login'; // Redirect to login
    }
  }
});
</script>

<style>
/* Add any global styles if necessary */
</style>
