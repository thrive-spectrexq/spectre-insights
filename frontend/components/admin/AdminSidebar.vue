<!-- frontend/components/admin/AdminSidebar.vue -->
<template>
    <aside class="w-64 bg-gray-800 text-white h-full p-4">
      <h2 class="text-2xl font-semibold mb-6">Admin Panel</h2>
      <nav>
        <ul class="space-y-4">
          <li>
            <nuxt-link to="/admin/dashboard" class="block hover:bg-gray-700 p-2 rounded">Dashboard</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/users" class="block hover:bg-gray-700 p-2 rounded">Users</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/products" class="block hover:bg-gray-700 p-2 rounded">Products</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/settings" class="block hover:bg-gray-700 p-2 rounded">Settings</nuxt-link>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup lang="ts">
  // No additional script needed for now
  </script>
  
  <style scoped>
  /* Add any admin sidebar-specific styles here */
  </style>
  