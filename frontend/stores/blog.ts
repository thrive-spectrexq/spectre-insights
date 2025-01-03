import { useRuntimeConfig } from '#app'; // Import useRuntimeConfig
import { useFetch } from 'nuxt/app';
import { defineStore } from 'pinia';
import { ref } from 'vue';

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

    // Fetch all blog posts from MongoDB-connected backend API
    const fetchPosts = async () => {
        loading.value = true;
        error.value = null;
        const config = useRuntimeConfig(); // Access runtime config

        try {
            const { data } = await useFetch(`${config.public.MONGO_URI}/blog`, {
                method: 'GET',
                credentials: 'include', // Include cookies if necessary
            });
            posts.value = data.value; // Adjust based on the actual response structure
        } catch (err: any) {
            error.value = err.value?.data?.message || 'Failed to fetch blog posts';
        } finally {
            loading.value = false;
        }
    };

    // Search blog posts based on query
    const searchPosts = async (query: string) => {
        loading.value = true;
        error.value = null;
        const config = useRuntimeConfig(); // Access runtime config

        try {
            const { data } = await useFetch(`${config.public.MONGO_URI}/blog?q=${query}`, {
                method: 'GET',
                credentials: 'include', // Include cookies if necessary
            });
            posts.value = data.value; // Adjust based on the actual response structure
        } catch (err: any) {
            error.value = err.value?.data?.message || 'Search failed';
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
