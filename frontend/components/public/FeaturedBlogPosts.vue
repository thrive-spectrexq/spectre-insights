<!-- components/public/FeaturedBlogPosts.vue -->
<template>
    <section class="py-16">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Featured Blog Posts</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BlogPostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import BlogPostCard from '~/components/public/BlogPostCard.vue'
  
  interface BlogPost {
    id: number
    title: string
    excerpt: string
    slug: string
    coverImage: string
  }
  
  const props = defineProps<{
    posts: BlogPost[]
  }>()
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  