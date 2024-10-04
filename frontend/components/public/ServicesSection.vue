<!-- components/public/ServicesSection.vue -->
<template>
    <section class="py-16">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard v-for="service in services" :key="service.id" :service="service" />
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import ServiceCard from '~/components/public/ServiceCard.vue'
  
  interface Service {
    id: number
    title: string
    description: string
  }
  
  const props = defineProps<{
    services: Service[]
  }>()
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  