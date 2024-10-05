<!-- frontend/components/admin/AdminNavbar.vue -->
<template>
    <header class="bg-gray-700 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Admin Dashboard</h1>
      <button @click="handleLogout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
    </header>
  </template>
  
  <script setup lang="ts">
  //import { useAuth } from '@sidebase/nuxt-auth'
  import { useRouter } from 'vue-router'
  
  //const auth = useAuth()
  const router = useRouter()
  
  const handleLogout = async () => {
    try {
      await auth.signout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  </script>
  
  <style scoped>
  /* Add any admin navbar-specific styles here */
  </style>
  