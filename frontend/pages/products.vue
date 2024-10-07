<!-- pages/products.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Our Products</h1>

    <div v-if="loading" class="text-center">
      <p>Loading products...</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product.id" class="border rounded-lg p-4 shadow">
        <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
        <p class="mb-2">{{ product.description }}</p>
        <p class="font-bold mb-2">Price: ${{ product.price }}</p>
        <div>
          <h3 class="font-semibold">Reviews:</h3>
          <ul class="list-disc list-inside">
            <li v-for="(review, index) in product.reviews" :key="index">{{ review }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Mockup data for products
const products = ref([
  {
    id: 1,
    name: 'Product A',
    description: 'This is a great product A that offers amazing features.',
    price: 100,
    reviews: ['Great quality!', 'Amazing value for the price.', 'Would buy again.']
  },
  {
    id: 2,
    name: 'Product B',
    description: 'Product B is known for its durability and style.',
    price: 150,
    reviews: ['Stylish and durable.', 'High quality material.', 'Impressed with the design.']
  },
  {
    id: 3,
    name: 'Product C',
    description: 'Product C delivers outstanding performance in all areas.',
    price: 200,
    reviews: ['Outstanding performance!', 'Best in the market.', 'Highly recommended.']
  },
  {
    id: 4,
    name: 'Product D',
    description: 'Product D is a budget-friendly option with premium features.',
    price: 120,
    reviews: ['Affordable and great features.', 'Perfect for the price.', 'Exceeded expectations.']
  },
]);

const loading = ref(false);

onMounted(() => {
  // Simulate loading delay if needed
  loading.value = false;
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
