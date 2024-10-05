<!-- frontend/pages/profile.vue -->
<template>
  <div class="container mx-auto py-8 px-4 max-w-md">
    <SectionHeader title="Your Profile" />
    <div v-if="userStore.profile">
      <p><strong>Name:</strong> {{ userStore.profile.name }}</p>
      <p><strong>Email:</strong> {{ userStore.profile.email }}</p>
      <!-- Add more user details as needed -->

      <button @click="handleLogout" class="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
        Logout
      </button>
    </div>
    <div v-else>
      <p>Loading your profile...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
//import { useAuth } from '@sidebase/nuxt-auth'
import { useRouter } from 'vue-router'
import SectionHeader from '~/components/common/SectionHeader.vue'

const userStore = useUserStore()
//const auth = useAuth()
const router = useRouter()

const handleLogout = async () => {
  try {
    await auth.signout()
    userStore.clearUserProfile()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

onMounted(() => {
  userStore.fetchUserProfile()
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
