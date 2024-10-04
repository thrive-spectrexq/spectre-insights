<!-- pages/services.vue -->
<template>
    <div>
      <SectionHeader title="Our Services" />
      <div class="container mx-auto py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceDetailCard v-for="service in services" :key="service.id" :service="service" />
        </div>
      </div>
      <TestimonialsSection :testimonials="testimonials" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import SectionHeader from '~/components/common/SectionHeader.vue'
  import ServiceDetailCard from '~/components/public/ServiceDetailCard.vue'
  import TestimonialsSection from '~/components/public/TestimonialsSection.vue'
  import axios from 'axios'
  
  interface Service {
    id: number
    title: string
    description: string
    price: number
  }
  
  interface Testimonial {
    id: number
    name: string
    position: string
    message: string
    avatar: string
  }
  
  const services = ref<Service[]>([])
  const testimonials = ref<Testimonial[]>([])
  
  onMounted(async () => {
    try {
      // Fetch services from backend
      const servicesRes = await axios.get(`${process.env.NUXT_PUBLIC_API_URL}/services`)
      services.value = servicesRes.data
  
      // Fetch testimonials from backend or Strapi
      const testimonialsRes = await axios.get(`${process.env.NUXT_PUBLIC_API_URL}/testimonials`)
      testimonials.value = testimonialsRes.data
    } catch (error) {
      console.error('Error fetching services or testimonials:', error)
    }
  })
  </script>
  
  <style scoped>
  /* Add any page-specific styles here */
  </style>
  