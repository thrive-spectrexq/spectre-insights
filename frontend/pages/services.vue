<!-- frontend/pages/services.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Our Services</h1>
    <div v-if="loading" class="text-center">
      <p>Loading services...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="service in services" :key="service.id" class="border rounded-lg p-4 shadow">
        <h2 class="text-xl font-semibold mb-2">{{ service.title }}</h2>
        <p class="mb-2">{{ service.description }}</p>
        <p class="font-bold mb-2">Price: ${{ service.price }}</p>
        <div>
          <h3 class="font-semibold">Testimonials:</h3>
          <ul class="list-disc list-inside">
            <li v-for="(testimonial, index) in service.testimonials" :key="index">{{ testimonial }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useServicesStore } from '~/stores/services';

const servicesStore = useServicesStore();

const { services, loading, error, fetchServices } = servicesStore;

onMounted(() => {
  fetchServices();
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
