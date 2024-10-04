<!-- components/public/ProductCard.vue -->
<template>
    <div class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover mb-4 rounded" />
      <h3 class="text-2xl font-semibold mb-2">{{ product.name }}</h3>
      <p class="text-xl text-green-600 mb-4">${{ product.price }}</p>
      <NuxtLink :to="`/products/${product.id}`" class="bg-blue-600 text-white px-4 py-2 rounded">
        View Details
      </NuxtLink>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  interface Product {
    id: number
    name: string
    price: number
    image: string
  }
  
  const props = defineProps<{
    product: Product
  }>()
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  