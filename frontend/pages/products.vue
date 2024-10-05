<!-- frontend/pages/products.vue -->
<template>
    <div class="container mx-auto py-8 px-4">
      <SectionHeader title="Our Products" />
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import SectionHeader from '~/components/common/SectionHeader.vue'
  import ProductCard from '~/components/public/ProductCard.vue'
  
  // Sample product data
  interface Product {
    id: number
    name: string
    description: string
    image: string
    link: string
  }
  
  const products: Product[] = [
    {
      id: 1,
      name: 'Analytics Dashboard',
      description: 'A comprehensive dashboard that provides real-time analytics and insights.',
      image: '/images/products/dashboard.png',
      link: '/products/analytics-dashboard',
    },
    {
      id: 2,
      name: 'Marketing Automation',
      description: 'Automate your marketing campaigns with our advanced tools.',
      image: '/images/products/marketing.png',
      link: '/products/marketing-automation',
    },
    {
      id: 3,
      name: 'Customer Relationship Management',
      description: 'Manage your customer relationships efficiently and effectively.',
      image: '/images/products/crm.png',
      link: '/products/crm',
    },
    // Add more products as needed
  ]
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  