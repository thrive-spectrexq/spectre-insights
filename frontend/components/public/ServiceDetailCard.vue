<!-- components/public/ServiceDetailCard.vue -->
<template>
    <div class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 class="text-2xl font-semibold mb-2">{{ service.title }}</h3>
      <p class="text-gray-700 mb-4">{{ service.description }}</p>
      <p class="text-xl font-bold mb-4">${{ service.price }}</p>
      <NuxtLink :to="`/services/${service.id}`" class="bg-blue-600 text-white px-4 py-2 rounded">
        Learn More
      </NuxtLink>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  interface Service {
    id: number
    title: string
    description: string
    price: number
  }
  
  const props = defineProps<{
    service: Service
  }>()
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  