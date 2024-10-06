<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-semibold text-center mb-8">What Our Clients Say</h2>
      <div class="flex flex-wrap -mx-4">
        <div v-for="testimonial in testimonials" :key="testimonial._id" class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <p class="text-gray-700 mb-4">"{{ testimonial.message }}"</p>
            <div class="flex items-center">
              <img :src="testimonial.authorImage" alt="Author Image" class="w-12 h-12 rounded-full mr-4">
              <div>
                <h4 class="text-lg font-semibold">{{ testimonial.authorName }}</h4>
                <p class="text-gray-500">{{ testimonial.authorPosition }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFetch } from '#app';

interface Testimonial {
  _id: string;
  message: string;
  authorName: string;
  authorPosition: string;
  authorImage: string;
}

const { data: testimonials, error } = await useFetch<Testimonial[]>('/api/testimonials');

// Optionally handle error
if (error.value) {
  console.error('Error fetching testimonials:', error.value);
}
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
