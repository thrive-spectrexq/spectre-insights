<!-- pages/blog/index.vue -->
<template>
    <div>
      <SectionHeader title="Our Blog" />
      <div class="container mx-auto py-8 px-4">
        <SearchBar v-model="searchQuery" @search="fetchBlogPosts" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <BlogPostCard
            v-for="post in paginatedPosts"
            :key="post.id"
            :post="post"
          />
        </div>
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @pageChange="changePage"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  import SectionHeader from '~/components/common/SectionHeader.vue';
  import BlogPostCard from '~/components/public/BlogPostCard.vue';
  import SearchBar from '~/components/common/SearchBar.vue';
  import Pagination from '~/components/common/Pagination.vue';
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
  
  // Reactive variables
  const blogPosts = ref<BlogPost[]>([]);
  const searchQuery = ref<string>('');
  const currentPage = ref<number>(1);
  const postsPerPage = 6; // Number of posts per page
  const totalPages = ref<number>(1);
  
  // Fetch blog posts from the API
  const fetchBlogPosts = async () => {
    try {
      // Example API endpoint, replace with your actual Strapi endpoint
      const response = await axios.get('/api/blog-posts', {
        params: {
          _sort: 'publishedAt:DESC',
          _limit: postsPerPage,
          _start: (currentPage.value - 1) * postsPerPage,
          _where: {
            _or: [
              { title_contains: searchQuery.value },
              { content_contains: searchQuery.value },
            ],
          },
        },
      });
  
      blogPosts.value = response.data;
      // Assuming your API returns the total count in headers or a separate endpoint
      const totalCount = parseInt(response.headers['x-total-count'], 10);
      totalPages.value = Math.ceil(totalCount / postsPerPage);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };
  
  // Computed property for paginated posts (optional if API handles pagination)
  const paginatedPosts = computed(() => blogPosts.value);
  
  // Change page handler
  const changePage = (page: number) => {
    currentPage.value = page;
  };
  
  // Watchers
  watch([searchQuery, currentPage], () => {
    fetchBlogPosts();
  });
  
  // Fetch posts on component mount
  onMounted(() => {
    fetchBlogPosts();
  });
  </script>
  
  <style scoped>
  /* Add any scoped styles for the blog listing page here */
  </style>
  