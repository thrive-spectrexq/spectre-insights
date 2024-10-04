<!-- components/public/ServiceCard.vue -->
<template>
    <div class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 class="text-2xl font-semibold mb-2">{{ service.title }}</h3>
      <p class="text-gray-700">{{ service.description }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  interface Service {
    id: number
    title: string
    description: string
  }
  
  const props = defineProps<{
    service: Service
  }>()
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  