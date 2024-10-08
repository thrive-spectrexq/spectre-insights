<template>
  <div v-if="isAuthenticated && user.role === 'admin'" class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold">Total Users</h2>
        <p class="text-3xl">{{ stats.totalUsers }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold">Total Blog Posts</h2>
        <p class="text-3xl">{{ stats.totalBlogs }}</p>
      </div>
      <!-- More stats here -->
    </div>
  </div>

  <div v-else class="text-center p-6">
    <p class="text-red-500">Unauthorized: You do not have access to this page.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useFetch } from '#app';

// Use authentication store
const authStore = useAuthStore();
const { isAuthenticated, user, fetchUserProfile } = authStore;

// Stats data
const stats = ref({
  totalUsers: 0,
  totalBlogs: 0,
});

// Fetch the user profile and dashboard stats on mount
onMounted(async () => {
  if (!isAuthenticated.value) {
    await fetchUserProfile();
  }

  if (isAuthenticated.value && user.role === 'admin') {
    // Fetch admin dashboard stats
    const { data } = await useFetch('/api/admin/stats');
    stats.value = data.value;
  }
});
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
