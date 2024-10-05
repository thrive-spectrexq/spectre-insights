<!-- frontend/pages/index.vue -->
<template>
  <div>
    <HeroSection />
    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import HeroSection from '~/components/public/HeroSection.vue'
import CallToAction from '~/components/public/CallToAction.vue'
import { useApi } from '~/server/api' // Assuming you have a centralized API service

onMounted(async () => {
  // Since we are removing services, products, and featured posts,
  // we don't need to fetch them anymore.
})
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
