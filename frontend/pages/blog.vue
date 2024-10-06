<!-- pages/blog.vue -->
<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Blog</h1>
      <div class="mb-4">
        <input
          v-model="searchQuery"
          @keyup.enter="search"
          type="text"
          placeholder="Search blog posts..."
          class="w-full p-2 border rounded"
        />
        <button @click="search" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Search</button>
      </div>
      <div v-if="loading" class="text-center">
        <p>Loading blog posts...</p>
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        <p>{{ error }}</p>
      </div>
      <div v-else class="space-y-4">
        <div v-for="post in posts" :key="post.id" class="border rounded-lg p-4 shadow">
          <h2 class="text-2xl font-semibold mb-2">{{ post.title }}</h2>
          <p class="mb-2">{{ post.content }}</p>
          <p class="text-sm text-gray-500">Category: {{ post.category }}</p>
          <p class="text-sm text-gray-500">Tags: {{ post.tags.join(', ') }}</p>
          <p class="text-sm text-gray-500">Published on: {{ new Date(post.createdAt).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useBlogStore } from '~/stores/blog';
  
  const blogStore = useBlogStore();
  
  const { posts, loading, error, fetchPosts, searchPosts } = blogStore;
  
  const searchQuery = ref('');
  
  const search = () => {
    if (searchQuery.value.trim()) {
      searchPosts(searchQuery.value);
    } else {
      fetchPosts();
    }
  };
  
  fetchPosts();
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  