<template>
  <div v-if="isAuthenticated && user.role === 'admin'" class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Content Management</h1>
    <!-- Content management operations (CRUD) -->
  </div>
  <div v-else class="text-center p-6">
    <p class="text-red-500">Unauthorized: You do not have access to this page.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

// Use authentication store
const authStore = useAuthStore();
const { isAuthenticated, user, fetchUserProfile } = authStore;

// Fetch the user profile on mount to check if they are an admin
onMounted(async () => {
  if (!isAuthenticated.value) {
    await fetchUserProfile();
  }
});
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
