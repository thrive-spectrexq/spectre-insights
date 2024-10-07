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
      <p class="text-center">Loading...</p> <!-- Consider adding a spinner here -->
    </div>

    <!-- Notification -->
    <Notification
      v-if="notification.visible"
      :type="notification.type"
      :message="notification.message"
      :duration="5000"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Notification from '@/components/Notification.vue'; // Import Notification component

const authStore = useAuthStore();

const notification = ref<{
  visible: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
}>( {
  visible: false,
  type: 'info',
  message: '',
});

// Handle sign out
const handleSignout = () => {
  authStore.signout()
    .then(() => {
      // Set notification for sign-out success
      notification.value = {
        visible: true,
        type: 'info',
        message: 'You have been signed out.',
      };
    })
    .catch((error) => {
      // Set notification for sign-out error
      notification.value = {
        visible: true,
        type: 'error',
        message: 'Error signing out: ' + error.message,
      };
    });
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
