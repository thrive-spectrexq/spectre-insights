<!-- pages/blog/[id].vue -->
<template>
    <div>
      <SectionHeader :title="blogPost?.title || 'Loading...'" :subtitle="formattedDate" />
      <div class="container mx-auto py-8 px-4">
        <img v-if="blogPost" :src="blogPost.image" :alt="blogPost.title" class="w-full h-64 object-cover rounded-lg" />
        <div v-if="blogPost" class="mt-6 prose prose-lg">
          <nuxt-content :document="blogPost.content" />
        </div>
        <div v-if="blogPost" class="mt-6 flex flex-wrap items-center">
          <div class="mr-4">
            <span class="font-semibold">Category:</span>
            <nuxt-link :to="`/blog/category/${blogPost.category}`" class="text-blue-500 hover:underline">
              {{ blogPost.category }}
            </nuxt-link>
          </div>
          <div class="flex flex-wrap">
            <span class="font-semibold mr-2">Tags:</span>
            <nuxt-link
              v-for="tag in blogPost.tags"
              :key="tag"
              :to="`/blog/tag/${tag}`"
              class="text-blue-500 hover:underline mr-2"
            >
              {{ tag }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import SectionHeader from '~/components/common/SectionHeader.vue';
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
  const blogPost = ref<BlogPost | null>(null);
  
  // Function to format the publication date
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const formattedDate = computed(() => {
    return blogPost.value ? formatDate(blogPost.value.publishedAt) : '';
  });
  
  // Fetch the blog post based on ID
  const fetchBlogPost = async () => {
    const postId = route.params.id;
    try {
      // Example API endpoint, replace with your actual Strapi endpoint
      const response = await axios.get(`/api/blog-posts/${postId}`);
      blogPost.value = response.data;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      // Handle error (e.g., redirect to 404 page)
    }
  };
  
  onMounted(() => {
    fetchBlogPost();
  });
  </script>
  
  <style scoped>
  /* Add any scoped styles for the blog post detail page here */
  </style>
  