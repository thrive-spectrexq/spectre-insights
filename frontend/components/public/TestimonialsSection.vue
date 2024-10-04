<!-- components/public/TestimonialsSection.vue -->
<template>
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto">
        <SectionHeader title="What Our Clients Say" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard v-for="testimonial in testimonials" :key="testimonial.id" :testimonial="testimonial" />
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import SectionHeader from '~/components/common/SectionHeader.vue'
  import TestimonialCard from '~/components/public/TestimonialCard.vue'
  
  interface Testimonial {
    id: number
    name: string
    position: string
    message: string
    avatar: string
  }
  
  const props = defineProps<{
    testimonials: Testimonial[]
  }>()
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  