<!-- frontend/pages/products.vue -->
<template>
  <div class="container mx-auto py-8 px-4">
    <SectionHeader title="Our Products" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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

// Access the custom Axios instance
const { $axios } = useNuxtApp()

onMounted(async () => {
  try {
    // Fetch all products from backend or Strapi
    const productsRes = await $axios.get('/products')
    products.value = productsRes.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
