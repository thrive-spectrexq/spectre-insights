<!-- frontend/layouts/admin.vue -->
<template>
  <div class="flex min-h-screen">
    <AdminSidebar />
    <div class="flex-1">
      <AdminNavbar />
      <main class="p-4">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
import AdminNavbar from '~/components/admin/AdminNavbar.vue'
</script>

<style scoped>
/* Add any admin layout-specific styles here */
</style>
