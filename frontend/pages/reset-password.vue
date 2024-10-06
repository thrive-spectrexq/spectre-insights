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
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Reset Link
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const email = ref('');

const authStore = useAuthStore();
const toast = useToast();

const handleResetPassword = async () => {
  try {
    const message = await authStore.resetPassword(email.value);
    toast.success(message);
  } catch (error: any) {
    toast.error(error);
  }
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
