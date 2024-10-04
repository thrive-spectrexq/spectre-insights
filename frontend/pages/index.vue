<!-- pages/index.vue -->
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
  import axios from 'axios'
  
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
  
  onMounted(async () => {
    try {
      // Fetch services from backend
      const servicesRes = await axios.get(`${process.env.NUXT_PUBLIC_API_URL}/services`)
      services.value = servicesRes.data
  
      // Fetch featured products from backend or Strapi
      const productsRes = await axios.get(`${process.env.NUXT_PUBLIC_API_URL}/products?featured=true`)
      products.value = productsRes.data
  
      // Fetch featured blog posts from Strapi
      const blogRes = await axios.get(`${process.env.NUXT_PUBLIC_STRAPI_URL}/blog-posts?featured=true`)
      featuredPosts.value = blogRes.data
    } catch (error) {
      console.error('Error fetching homepage data:', error)
    }
  })
  </script>
  
  <style scoped>
  /* Add any page-specific styles here */
  </style>
  