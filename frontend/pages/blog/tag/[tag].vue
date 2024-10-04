<!-- pages/blog/tag/[tag].vue -->
<template>
    <div>
      <SectionHeader :title="`Tag: ${tag}`" />
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
  const tag = ref<string>('');
  
  const fetchTagPosts = async () => {
    const tagParam = route.params.tag;
    tag.value = tagParam as string;
  
    try {
      // Example API endpoint, replace with your actual Strapi endpoint
      const response = await axios.get('/api/blog-posts', {
        params: {
          tags_contains: tag.value,
          _sort: 'publishedAt:DESC',
        },
      });
      filteredPosts.value = response.data;
    } catch (error) {
      console.error('Error fetching tag posts:', error);
      // Handle error (e.g., redirect to 404 page)
    }
  };
  
  onMounted(() => {
    fetchTagPosts();
  });
  </script>
  
  <style scoped>
  /* Add any scoped styles for the tag page here */
  </style>
  