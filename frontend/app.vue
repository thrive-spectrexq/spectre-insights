<!-- frontend/app.vue -->

<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

// Fetch user profile on app mount
if (authStore.token) {
  authStore.fetchUserProfile();
}
</script>

<script setup lang="ts">
// Import global styles
import '~/assets/css/tailwind.css'
</script>

<style>
/* Global styles if any */
</style>
