<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Reset Password</h1>
    <form @submit.prevent="handleResetPassword" class="max-w-md mx-auto space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Send Reset Link</span>
        </button>
      </div>
    </form>

    <!-- Notification -->
    <Notification
      v-if="notification.visible"
      :type="notification.type"
      :message="notification.message"
      :duration="5000"
    />

    <!-- Additional guidance -->
    <p v-if="notification.visible && notification.type === 'success'" class="mt-4 text-sm text-gray-600">
      Please check your email for the reset link.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Notification from '@/components/Notification.vue'; // Import Notification component

const email = ref('');
const authStore = useAuthStore();
const isLoading = ref(false); // Loading state

const notification = ref<{
  visible: boolean;
  type: 'success' | 'error';
  message: string;
}>({
  visible: false,
  type: 'success',
  message: '',
});

const handleResetPassword = async () => {
  isLoading.value = true; // Set loading state
  try {
    const message = await authStore.resetPassword(email.value);

    // Set notification for success
    notification.value = {
      visible: true,
      type: 'success',
      message: message, // Display the success message from the auth store
    };

    // Optionally reset the email field after successful submission
    email.value = '';
    
  } catch (error: any) {
    // Set notification for error
    notification.value = {
      visible: true,
      type: 'error',
      message: error.message || 'An error occurred while sending the reset link.',
    };
  } finally {
    isLoading.value = false; // Reset loading state
  }
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
