<!-- pages/products.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Our Products</h1>
    <div v-if="loading" class="text-center">
      <p>Loading products...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
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
import { onMounted } from 'vue';
import { useProductsStore } from '~/stores/products';

const productsStore = useProductsStore();

const { products, loading, error, fetchProducts } = productsStore;

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
