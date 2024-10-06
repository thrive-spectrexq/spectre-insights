<template>
  <div class="mt-6">
    <h2 class="text-2xl font-semibold mb-4">Our Location</h2>
    <iframe
      :src="mapUrl"
      style="border: 0; width: 100%; height: 400px;"
      allowfullscreen
      loading="lazy"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const latitude = ref(40.7128); // Example latitude (New York City)
const longitude = ref(-74.0060); // Example longitude (New York City)

// Create a computed property for the map URL
const mapUrl = computed(() => {
  return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude.value - 0.01},${latitude.value - 0.01},${longitude.value + 0.01},${latitude.value + 0.01}&layer=mapnik&marker=${latitude.value},${longitude.value}`;
});
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
