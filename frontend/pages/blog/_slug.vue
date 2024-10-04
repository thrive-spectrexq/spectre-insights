<!-- pages/blog/_slug.vue -->
<template>
    <div>
      <SectionHeader :title="post?.title || 'Loading...'" />
      <div class="container mx-auto py-8 px-4">
        <div v-if="post">
          <img :src="post.image" alt="Blog Post Image" class="w-full h-auto mb-4" />
          <div v-html="post.content" class="prose max-w-full"></div>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
        <nuxt-link to="/blog" class="mt-4 inline-block text-blue-500">Back to Blog</nuxt-link>
      </div>
    </div>
</template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import SectionHeader from '~/components/common/SectionHeader.vue'
  import axios from 'axios'
  
  interface BlogPost {
    id: number
    title: string
    content: string
    image: string
  }
  
  const post = ref<BlogPost | null>(null)
  const route = useRoute()
  
  const fetchBlogPost = async () => {
    const slug = route.params.slug
    try {
      const response = await axios.get(`/api/blog/${slug}`) // Adjust the API endpoint accordingly
      post.value = response.data
    } catch (error) {
      console.error('Error fetching blog post:', error)
    }
  }
  
  onMounted(() => {
    fetchBlogPost()
  })
  </script>
  
  <style scoped>
  .prose {
    max-width: 800px; /* Adjust as needed */
    margin: 0 auto;
  }
  </style>
  