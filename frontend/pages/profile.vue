<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">My Profile</h1>
    <div v-if="authStore.user" class="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <p><strong>Name:</strong> {{ authStore.user.name }}</p>
      <p><strong>Email:</strong> {{ authStore.user.email }}</p>
      <p><strong>Role:</strong> {{ authStore.user.role }}</p>
      <button @click="handleSignout" class="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
        Sign Out
      </button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const toast = useToast();

const handleSignout = () => {
  authStore.signout();
  toast.info('You have been signed out.');
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
