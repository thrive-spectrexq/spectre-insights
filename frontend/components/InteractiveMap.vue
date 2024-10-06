<template>
    <div class="mt-6">
      <h2 class="text-2xl font-semibold mb-4">Our Location</h2>
      <LMap
        :zoom="13"
        :center="[latitude, longitude]"
        style="height: 400px; width: 100%;"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <LMarker :lat-lng="[latitude, longitude]">
          <LPopup>
            Spectre Insights
          </LPopup>
        </LMarker>
      </LMap>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { LMap, LTileLayer, LMarker, LPopup } from 'vue3-leaflet';
  
  const latitude = ref(40.7128); // Example latitude (New York City)
  const longitude = ref(-74.0060); // Example longitude (New York City)
  </script>
  
  <style scoped>
  /* Add any additional styles if necessary */
  </style>
  