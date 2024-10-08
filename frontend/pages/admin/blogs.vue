<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Manage Blogs</h1>
    
    <div v-if="loading" class="text-center">
      <p>Loading blogs...</p>
    </div>
    
    <div v-else-if="error" class="text-red-500">
      <p>Error loading blogs: {{ error }}</p>
    </div>
    
    <div v-else class="space-y-4">
      <!-- List of Blogs -->
      <div v-for="blog in posts" :key="blog.id" class="bg-white p-4 shadow rounded-md">
        <h2 class="text-xl font-semibold mb-2">{{ blog.title }}</h2>
        <p class="text-gray-700 mb-4">{{ blog.content }}</p>
        <div class="flex space-x-2">
          <button @click="editBlog(blog)" class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">Edit</button>
          <button @click="deleteBlogPost(blog.id)" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
        </div>
      </div>
      
      <!-- Create New Blog -->
      <div class="mt-6">
        <h3 class="text-2xl font-bold mb-4">Create New Blog</h3>
        <input v-model="newBlog.title" type="text" placeholder="Blog Title" class="border p-2 w-full rounded-md mb-2" />
        <textarea v-model="newBlog.content" rows="5" placeholder="Blog Content" class="border p-2 w-full rounded-md mb-2"></textarea>
        <button @click="createBlogPost" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Create Blog</button>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message" class="mt-4 p-4 text-green-700 bg-green-100 rounded">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBlogStore } from '~/stores/blog';

const blogStore = useBlogStore();
const { posts, loading, error, fetchPosts, createBlog, deleteBlog } = blogStore;

// Reactive states for new blog form
const newBlog = ref({
  title: '',
  content: '',
});

// Success/error message for the UI
const message = ref('');

// Fetch blogs on component mount
onMounted(async () => {
  await fetchPosts(); // Ensure you call the correct function
});

// Create a new blog
const createBlogPost = async () => {
  if (!newBlog.value.title || !newBlog.value.content) {
      message.value = 'Title and content are required.';
      return;
  }

  try {
      await createBlog(newBlog.value);
      message.value = 'Blog created successfully!';
      newBlog.value = { title: '', content: '' }; // Reset form
      await fetchPosts(); // Refresh the list after creation
  } catch (error) {
      message.value = 'Error creating blog. Please try again.';
  }
};

// Edit an existing blog (you can extend this function)
const editBlog = (blog) => {
  newBlog.value = { ...blog }; // Prefill the form for editing
};

// Delete a blog
const deleteBlogPost = async (blogId) => {
  try {
      await deleteBlog(blogId);
      message.value = 'Blog deleted successfully!';
      await fetchPosts(); // Refresh the list after deletion
  } catch (error) {
      message.value = 'Error deleting blog. Please try again.';
  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
