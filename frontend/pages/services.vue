<!-- frontend/pages/services.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Our Services</h1>

    <div v-if="loading" class="text-center">
      <p>Loading services...</p>
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
        <!-- Learn More Link -->
        <NuxtLink :to="`/services/${service.id}`" class="text-indigo-600 font-semibold hover:underline mt-4 block">
          Learn More
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Mockup data for services
const services = ref([
  {
    id: 1,
    title: 'Web Development',
    description: 'We provide cutting-edge web development services tailored to your business needs.',
    price: 1500,
    testimonials: ['Excellent service!', 'Highly professional team.', 'Delivered ahead of schedule.']
  },
  {
    id: 2,
    title: 'SEO Optimization',
    description: 'Improve your website ranking with our specialized SEO services.',
    price: 1200,
    testimonials: ['Our traffic doubled in 3 months!', 'Great results.', 'Professional and transparent process.']
  },
  {
    id: 3,
    title: 'Digital Marketing',
    description: 'Boost your online presence with our comprehensive digital marketing services.',
    price: 2000,
    testimonials: ['Our ROI increased significantly.', 'Very effective campaigns.', 'Highly recommended!']
  },
  {
    id: 4,
    title: 'UI/UX Design',
    description: 'Craft stunning and user-friendly interfaces with our UI/UX design services.',
    price: 1800,
    testimonials: ['Beautiful designs!', 'Our users love the new interface.', 'Great attention to detail.']
  },
]);

const loading = ref(false);

onMounted(() => {
  // Simulate loading delay if needed
  loading.value = false;
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
