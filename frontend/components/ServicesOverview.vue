<template>
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold text-center mb-8">Our Services</h2>
        <div class="flex flex-wrap -mx-4">
          <div v-for="service in services" :key="service._id" class="w-full md:w-1/3 px-4 mb-8">
            <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 class="text-xl font-bold mb-2">{{ service.title }}</h3>
              <p class="text-gray-700 mb-4">{{ service.description }}</p>
              <NuxtLink :to="`/services/${service.slug}`" class="text-indigo-600 font-semibold hover:underline">
                Learn More
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  interface Service {
    _id: string;
    title: string;
    description: string;
    slug: string;
  }
  
  const services = ref<Service[]>([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get('/api/services');
      services.value = response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  });
  </script>
  
  <style scoped>
  /* Add any additional styles if necessary */
  </style>
  