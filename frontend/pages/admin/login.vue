<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Admin Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">Email</label>
          <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="email" placeholder="Email" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="password">Password</label>
          <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" placeholder="Password" />
        </div>
        <button class="bg-indigo-600 text-white py-2 px-4 rounded" type="submit">Login</button>
      </form>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '~/stores/auth';
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  
  const authStore = useAuthStore();
  
  const handleLogin = async () => {
    try {
      await authStore.login(email.value, password.value);
      // Optionally redirect to admin dashboard
      if (authStore.user?.role === 'admin') {
        navigateTo('/admin/dashboard');
      } else {
        error.value = 'Access Denied';
      }
    } catch (err) {
      error.value = 'Invalid credentials';
    }
  };
  </script>
  