<!-- components/public/FeaturedProducts.vue -->
<template>
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import ProductCard from '~/components/public/ProductCard.vue'
  
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
  