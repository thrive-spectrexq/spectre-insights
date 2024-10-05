<!-- frontend/pages/index.vue -->
<template>
  <div>
    <HeroSection />
    <ServicesSection :services="services" />
    <FeaturedProducts :products="products" />
    <FeaturedBlogPosts :posts="featuredPosts" />
    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroSection from '~/components/public/HeroSection.vue'
import ServicesSection from '~/components/public/ServicesSection.vue'
import FeaturedProducts from '~/components/public/FeaturedProducts.vue'
import FeaturedBlogPosts from '~/components/public/FeaturedBlogPosts.vue'
import CallToAction from '~/components/public/CallToAction.vue'
import { useApi } from '~/server/api' // Assuming you have a centralized API service

interface Service {
  id: number
  title: string
  description: string
}

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface BlogPost {
  id: number
  title: string
  excerpt: string
  slug: string
  coverImage: string
}

const services = ref<Service[]>([])
const products = ref<Product[]>([])
const featuredPosts = ref<BlogPost[]>([])

const api = useApi()

onMounted(async () => {
  try {
    // Fetch services
    const servicesRes = await api.getServices()
    services.value = servicesRes.data

    // Fetch featured products
    const productsRes = await api.getFeaturedProducts()
    products.value = productsRes.data

    // Fetch featured blog posts
    const blogRes = await api.getFeaturedBlogPosts()
    featuredPosts.value = blogRes.data
  } catch (error) {
    console.error('Error fetching homepage data:', error)
  }
})
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
