<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Sign In</h1>
    <form @submit.prevent="handleSignin" class="max-w-md mx-auto space-y-4">
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
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div class="flex items-center justify-between">
        <div>
          <input 
            type="checkbox" 
            id="remember" 
            v-model="remember" 
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
          />
          <label for="remember" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>
        <div>
          <NuxtLink to="/reset-password" class="text-sm text-indigo-600 hover:text-indigo-800">Forgot your password?</NuxtLink>
        </div>
      </div>
      <div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Sign In</span>
        </button>
      </div>
      <div class="text-center">
        <span>Don't have an account?</span>
        <NuxtLink to="/signup" class="text-indigo-600 hover:text-indigo-800">Sign Up</NuxtLink>
      </div>
    </form>

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
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const remember = ref(false);
const isLoading = ref(false); // Loading state
const authStore = useAuthStore();
const router = useRouter();

const notification = ref<{
  visible: boolean;
  type: 'success' | 'error';
  message: string;
}>({
  visible: false,
  type: 'success',
  message: '',
});

const handleSignin = async () => {
  try {
    await authStore.login(email.value, password.value); // Use login instead of signin

    // Set notification for success
    notification.value = {
      visible: true,
      type: 'success',
      message: 'Signin successful!',
    };

    // Optionally reset the form fields or redirect after successful sign-in
    email.value = '';
    password.value = '';
    
  } catch (error: any) {
    // Set notification for error
    notification.value = {
      visible: true,
      type: 'error',
      message: error.message || 'An error occurred during signin.',
    };
  }
};

</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
