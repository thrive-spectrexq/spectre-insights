<template>
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold text-center mb-8">Latest Blog Posts</h2>
        <div class="flex flex-wrap -mx-4">
          <div v-for="post in posts" :key="post._id" class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <img :src="post.coverImage" alt="Cover Image" class="w-full h-48 object-cover">
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
                <p class="text-gray-700 mb-4">{{ post.excerpt }}</p>
                <NuxtLink :to="`/blog/${post.slug}`" class="text-indigo-600 font-semibold hover:underline">
                  Read More
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  interface BlogPost {
    _id: string;
    title: string;
    excerpt: string;
    slug: string;
    coverImage: string;
  }
  
  const posts = ref<BlogPost[]>([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get('/api/blogs?limit=3');
      posts.value = response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  });
  </script>
  
  <style scoped>
  /* Add any additional styles if necessary */
  </style>
  