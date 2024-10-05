<!-- frontend/components/public/ProductList.vue -->
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import ProductCard from './ProductCard.vue'
  
  interface Product {
    id: number
    name: string
    price: number
    image: string
  }
  
  const props = defineProps<{
    products: Product[]
  }>()
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  