<!-- frontend/pages/auth/profile.vue -->
<template>
  <div>
    <ProfileDetails />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-guard', // Use the exact middleware name
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
