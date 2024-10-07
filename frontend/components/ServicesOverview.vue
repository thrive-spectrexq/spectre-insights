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
import { ref } from 'vue';

// Define mock data for services
const services = ref([
  {
    _id: '1',
    title: 'Web Development',
    description: 'We offer cutting-edge web development services to create dynamic and responsive websites.',
    slug: 'web-development',
  },
  {
    _id: '2',
    title: 'SEO Optimization',
    description: 'Our SEO services help improve your website\'s ranking and attract more visitors.',
    slug: 'seo-optimization',
  },
  {
    _id: '3',
    title: 'Digital Marketing',
    description: 'Enhance your brand\'s visibility with our comprehensive digital marketing solutions.',
    slug: 'digital-marketing',
  },
  {
    _id: '4',
    title: 'UI/UX Design',
    description: 'Our team creates visually stunning and user-friendly interfaces to enhance user experience.',
    slug: 'ui-ux-design',
  },
]);
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
