<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Manage Users</h1>

    <!-- Display loading state -->
    <div v-if="loading" class="text-center">
      <p>Loading users...</p>
    </div>

    <!-- Display error message if any -->
    <div v-else-if="error" class="text-red-500">
      <p>Error loading users: {{ error }}</p>
    </div>

    <!-- List users -->
    <div v-else class="space-y-4">
      <div v-for="user in users" :key="user._id" class="bg-white p-4 shadow rounded-md">
        <h2 class="text-xl font-semibold mb-2">{{ user.name }}</h2>
        <p class="text-gray-700 mb-4">{{ user.email }}</p>
        <p class="text-sm text-gray-500">Role: {{ user.role }}</p>
        
        <!-- Role management actions for admin -->
        <div class="flex space-x-2 mt-4">
          <button @click="promoteToAdmin(user)" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700" v-if="user.role !== 'admin'">
            Promote to Admin
          </button>
          <button @click="revokeAdmin(user)" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700" v-if="user.role === 'admin'">
            Revoke Admin
          </button>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message" class="mt-4 p-4 text-green-700 bg-green-100 rounded">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Import the auth store
import { useUserStore } from '@/stores/user'; // Assume there's a store for managing users

// Use authentication store
const authStore = useAuthStore();
const { user, isAuthenticated, fetchUserProfile } = authStore;

// Use user management store
const userStore = useUserStore();
const { users, loading, error, fetchUsers, promoteToAdmin, revokeAdmin } = userStore;

// Reactive state for feedback messages
const message = ref('');

// Fetch users and check admin access on mount
onMounted(async () => {
  // Ensure the admin is logged in
  if (!isAuthenticated.value) {
    await fetchUserProfile();
  }
  
  // Fetch users if admin
  if (user.value.role === 'admin') {
    await fetchUsers();
  } else {
    message.value = 'Unauthorized: Only admins can access this page.';
  }
});

// Promote user to admin
const promoteToAdminHandler = async (user) => {
  try {
    await promoteToAdmin(user._id);
    message.value = `${user.name} has been promoted to Admin.`;
  } catch (error) {
    message.value = 'Failed to promote user to Admin.';
  }
};

// Revoke admin rights from user
const revokeAdminHandler = async (user) => {
  try {
    await revokeAdmin(user._id);
    message.value = `${user.name}'s Admin rights have been revoked.`;
  } catch (error) {
    message.value = 'Failed to revoke Admin rights.';
  }
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
