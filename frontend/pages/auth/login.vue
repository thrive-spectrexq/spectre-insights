<!-- frontend/pages/auth/login.vue -->
<template>
  <div class="container mx-auto py-8 px-4 max-w-md">
    <SectionHeader title="Login" />
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import SectionHeader from '~/components/common/SectionHeader.vue'
import LoginForm from '~/components/auth/LoginForm.vue'
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
