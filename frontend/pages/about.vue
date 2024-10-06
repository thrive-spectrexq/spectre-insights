<!-- pages/about.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">About Us</h1>
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Our History</h2>
      <p>
        <!-- Company history content -->
        Spectre Insights was founded in 2020 with a mission to provide top-notch services to our clients...
      </p>
    </section>
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Our Mission</h2>
      <p>
        <!-- Company mission content -->
        Our mission is to deliver innovative solutions that drive success for our clients...
      </p>
    </section>
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Our Team</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="member in teamMembers" :key="member.id" class="border rounded-lg p-4 shadow">
          <img :src="member.photo" alt="Team Member" class="w-full h-48 object-cover rounded-t-lg mb-4" />
          <h3 class="text-xl font-semibold">{{ member.name }}</h3>
          <p class="text-gray-600">{{ member.position }}</p>
        </div>
      </div>
    </section>
    <section>
      <h2 class="text-2xl font-semibold mb-2">Contact Information</h2>
      <p>Email: contact@spectreinsights.com</p>
      <p>Phone: +1 (555) 123-4567</p>
      <!-- Optional: Add an interactive map here -->
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Sample team members data
const teamMembers = ref([
  {
    id: 1,
    name: 'John Doe',
    position: 'CEO',
    photo: '/images/team/john_doe.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'CTO',
    photo: '/images/team/jane_smith.jpg',
  },
  // Add more team members as needed
]);
</script>

<style scoped>
/* Add any additional styling here */
</style>
