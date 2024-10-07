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

// Define mock testimonials data
const testimonials = ref([
  {
    _id: '1',
    message: 'This service has completely transformed our business. Highly recommended!',
    authorName: 'John Doe',
    authorPosition: 'CEO, Acme Corp',
    authorImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    _id: '2',
    message: 'The team is professional, efficient, and delivered beyond our expectations.',
    authorName: 'Jane Smith',
    authorPosition: 'Marketing Director, XYZ Ltd',
    authorImage: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    _id: '3',
    message: 'Outstanding experience from start to finish. We saw results within weeks.',
    authorName: 'Michael Johnson',
    authorPosition: 'Founder, StartUp Inc.',
    authorImage: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    _id: '4',
    message: 'A truly exceptional service that has helped us reach new heights.',
    authorName: 'Emily Davis',
    authorPosition: 'COO, Tech Innovations',
    authorImage: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
]);
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
