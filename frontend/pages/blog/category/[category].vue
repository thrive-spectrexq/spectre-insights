<!-- pages/blog/category/[category].vue -->
<template>
    <div>
      <SectionHeader :title="`Category: ${category}`" />
      <div class="container mx-auto py-8 px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <BlogPostCard
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import SectionHeader from '~/components/common/SectionHeader.vue';
  import BlogPostCard from '~/components/public/BlogPostCard.vue';
  import axios from 'axios';
  
  // Define the structure of a Blog Post
  interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    tags: string[];
    publishedAt: string;
  }
  
  const route = useRoute();
  const filteredPosts = ref<BlogPost[]>([]);
  const category = ref<string>('');
  
  const fetchCategoryPosts = async () => {
    const categoryParam = route.params.category;
    category.value = categoryParam as string;
  
    try {
      // Example API endpoint, replace with your actual Strapi endpoint
      const response = await axios.get('/api/blog-posts', {
        params: {
          category: category.value,
          _sort: 'publishedAt:DESC',
        },
      });
      filteredPosts.value = response.data;
    } catch (error) {
      console.error('Error fetching category posts:', error);
      // Handle error (e.g., redirect to 404 page)
    }
  };
  
  onMounted(() => {
    fetchCategoryPosts();
  });
  </script>
  
  <style scoped>
  /* Add any scoped styles for the category page here */
  </style>
  