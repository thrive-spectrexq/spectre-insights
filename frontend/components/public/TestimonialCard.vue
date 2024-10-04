<!-- components/public/TestimonialCard.vue -->
<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center mb-4">
        <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 class="text-xl font-semibold">{{ testimonial.name }}</h4>
          <p class="text-gray-500">{{ testimonial.position }}</p>
        </div>
      </div>
      <p class="text-gray-700">"{{ testimonial.message }}"</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  interface Testimonial {
    id: number
    name: string
    position: string
    message: string
    avatar: string
  }
  
  const props = defineProps<{
    testimonial: Testimonial
  }>()
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  