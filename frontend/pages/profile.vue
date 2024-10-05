<!-- frontend/pages/profile.vue -->
<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Your Profile</h2>
      <div v-if="user">
        <p class="mb-4"><strong>Name:</strong> {{ user.name }}</p>
        <p class="mb-4"><strong>Email:</strong> {{ user.email }}</p>
        <!-- Add more user fields as needed -->
        <button
          @click="logout"
          class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
  </div>
</template>
  
  <script setup lang="ts">
definePageMeta({
  layout: 'protected',
})

// Import necessary components and composables
import SectionHeader from '~/components/common/SectionHeader.vue'
import { useAuth } from '@sidebase/nuxt-auth'

const auth = useAuth()
const user = ref(auth.user)
</script>
  
  <style scoped>
  /* Optional: Add component-specific styles here */
  </style>
  