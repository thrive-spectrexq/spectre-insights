<!-- frontend/pages/products.vue -->
<template>
  <div class="container mx-auto py-8 px-4">
    <SectionHeader title="Our Products" />

    <!-- Loading state -->
    <div v-if="loading" class="text-center text-xl">
      Loading products...
    </div>

    <!-- Error state -->
    <div v-if="error" class="text-center text-red-600">
      {{ error }}
    </div>

    <!-- Products grid -->
    <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionHeader from '~/components/common/SectionHeader.vue'
import ProductCard from '~/components/public/ProductCard.vue'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Access the custom Axios instance
const { $axios } = useNuxtApp()

onMounted(async () => {
  try {
    // Fetch all products from backend or Strapi
    const productsRes = await $axios.get('/products')
    products.value = productsRes.data
  } catch (err) {
    error.value = 'Error fetching products. Please try again later.'
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
