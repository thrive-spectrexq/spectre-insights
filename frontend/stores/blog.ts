// frontend/stores/blog.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

interface BlogPost {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    createdAt: string;
}

export const useBlogStore = defineStore('blog', () => {
    const posts = ref<BlogPost[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchPosts = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/blogs`);
            posts.value = response.data;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Failed to fetch blog posts';
        } finally {
            loading.value = false;
        }
    };

    const searchPosts = async (query: string) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/blogs/search`, {
                params: { q: query },
            });
            posts.value = response.data;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Search failed';
        } finally {
            loading.value = false;
        }
    };

    return {
        posts,
        loading,
        error,
        fetchPosts,
        searchPosts,
    };
});
