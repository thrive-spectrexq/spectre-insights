<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Contact Us</h1>
    <div class="flex flex-col md:flex-row">
      <!-- Contact Form -->
      <div class="md:w-1/2 md:pr-4">
        <ContactForm />
      </div>
      <!-- Contact Details and Map -->
      <div class="md:w-1/2 md:pl-4 mt-8 md:mt-0">
        <ContactDetails />
        <InteractiveMap />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactForm from '@/components/ContactForm.vue';
import ContactDetails from '@/components/ContactDetails.vue';
import InteractiveMap from '@/components/InteractiveMap.vue';
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
