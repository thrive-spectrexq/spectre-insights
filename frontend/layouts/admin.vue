<template>
  <div class="admin-layout">
    <AdminNavbar />
    <div class="flex">
      <AdminSidebar />
      <main class="flex-grow">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminNavbar from '@/components/admin/Navbar.vue';
import AdminSidebar from '@/components/admin/Sidebar.vue';
</script>

<style scoped>
/* Admin layout styles */
</style>
