<!-- components/public/BlogPostCard.vue -->
<template>
  <div class="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
    <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">
        <nuxt-link :to="`/blog/${post.id}`" class="hover:underline">
          {{ post.title }}
        </nuxt-link>
      </h3>
      <p class="text-gray-700">{{ post.excerpt }}</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-sm text-gray-500">
          {{ formatDate(post.publishedAt) }}
        </span>
        <nuxt-link :to="`/blog/${post.id}`" class="text-blue-500 hover:underline">
          Read More
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

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

const props = defineProps<{
  post: BlogPost;
}>();

// Function to format the publication date
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<style scoped>
/* Add any scoped styles for the blog post card here */
</style>
