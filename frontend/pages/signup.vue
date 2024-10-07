<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Sign Up</h1>
    <form @submit.prevent="handleSignup" class="max-w-md mx-auto space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          v-model="name"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
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
      <div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Sign Up</span>
        </button>
      </div>
      <div class="text-center">
        <span>Already have an account?</span>
        <NuxtLink to="/signin" class="text-indigo-600 hover:text-indigo-800">Sign In</NuxtLink>
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

const name = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false); // New loading state
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

const handleSignup = async () => {
  try {
    await authStore.register(name.value, email.value, password.value); // Use register instead of signup
    
    // Set notification for success
    notification.value = {
      visible: true,
      type: 'success',
      message: 'Signup successful!',
    };

    // Reset form fields
    name.value = '';
    email.value = '';
    password.value = '';

  } catch (error: any) {
    // Set notification for error
    notification.value = {
      visible: true,
      type: 'error',
      message: error.message || 'An error occurred during signup.',
    };
  }
};

</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
