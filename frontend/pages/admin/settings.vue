<template>
  <div v-if="isAuthenticated && user.role === 'admin'" class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Site Settings</h1>

    <form @submit.prevent="updateSettings">
      <div class="mb-4">
        <label for="siteName" class="block text-gray-700 font-bold mb-2">Site Name</label>
        <input v-model="settings.siteName" id="siteName" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div class="mb-4">
        <label for="siteDescription" class="block text-gray-700 font-bold mb-2">Site Description</label>
        <textarea v-model="settings.siteDescription" id="siteDescription" rows="4" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>

      <div class="mb-4">
        <label for="adminEmail" class="block text-gray-700 font-bold mb-2">Admin Email</label>
        <input v-model="settings.adminEmail" id="adminEmail" type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div class="mb-4">
        <label for="maintenanceMode" class="block text-gray-700 font-bold mb-2">Maintenance Mode</label>
        <select v-model="settings.maintenanceMode" id="maintenanceMode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="off">Off</option>
          <option value="on">On</option>
        </select>
      </div>

      <div class="flex items-center justify-between">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Save Settings
        </button>
      </div>
    </form>

    <div v-if="message" class="mt-4 p-4 text-green-700 bg-green-100 rounded">
      {{ message }}
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

// Settings data
const settings = ref({
  siteName: '',
  siteDescription: '',
  adminEmail: '',
  maintenanceMode: 'off',
});
const message = ref('');

// Fetch the user profile and initial settings on mount
onMounted(async () => {
  if (!isAuthenticated.value) {
    await fetchUserProfile();
  }

  if (isAuthenticated.value && user.role === 'admin') {
    // Fetch current site settings (mocked API call)
    const { data } = await useFetch('/api/admin/settings');
    settings.value = data.value;
  }
});

// Function to handle settings update
const updateSettings = async () => {
  try {
    // Send updated settings to the backend API (mocked API call)
    await useFetch('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings.value),
    });

    message.value = 'Settings updated successfully!';
  } catch (error) {
    console.error('Error updating settings:', error);
    message.value = 'Failed to update settings.';
  }
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
