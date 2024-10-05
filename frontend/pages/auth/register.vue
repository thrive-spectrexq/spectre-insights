<!-- frontend/pages/auth/register.vue -->
<template>
  <div class="container mx-auto py-8 px-4 max-w-md">
    <SectionHeader title="Register" />
    <RegisterForm />
  </div>
</template>

<script setup lang="ts">
import SectionHeader from '~/components/common/SectionHeader.vue'
import RegisterForm from '~/components/auth/RegisterForm.vue'
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
