<!-- frontend/layouts/admin.vue -->
<template>
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 class="text-xl font-semibold mb-6">Admin Panel</h2>
        <nav class="space-y-4">
          <nuxt-link to="/admin/dashboard" class="block hover:bg-gray-700 p-2 rounded">Dashboard</nuxt-link>
          <nuxt-link to="/admin/users" class="block hover:bg-gray-700 p-2 rounded">Users</nuxt-link>
          <nuxt-link to="/admin/settings" class="block hover:bg-gray-700 p-2 rounded">Settings</nuxt-link>
          <!-- Add more admin links as needed -->
        </nav>
      </aside>
  
      <!-- Main Content -->
      <div class="flex-grow">
        <header class="bg-blue-600 text-white p-4">
          <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">Spectre Insights Admin</h1>
            <nuxt-link to="/login" class="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Logout</nuxt-link>
          </div>
        </header>
  
        <main class="p-4">
          <NuxtPage />
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineNuxtRouteMiddleware, navigateTo } from '#app'
  import { useAuth } from '@sidebase/nuxt-auth'
  
  // Apply auth middleware specifically to admin layout
  defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuth()
    const isAuthenticated = await auth.isAuthenticated()
  
    if (!isAuthenticated) {
      return navigateTo({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  
    // Optionally, check if the user has admin privileges
    // const user = auth.user
    // if (user.role !== 'admin') {
    //   return navigateTo('/unauthorized')
    // }
  })
  </script>
  
  <style scoped>
  /* Add any admin layout-specific styles here */
  </style>
  