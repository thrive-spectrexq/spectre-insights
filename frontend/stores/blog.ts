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

    const fetchPosts = async () => {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await useFetch(`${process.env.API_BASE_URL}/blogs`, {
                method: 'GET',
                credentials: 'include', // Include cookies if necessary
            });
            posts.value = data.value;
        } catch (err: any) {
            error.value = err.value?.data?.message || 'Failed to fetch blog posts';
        } finally {
            loading.value = false;
        }
    };

    const searchPosts = async (query: string) => {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await useFetch(`${process.env.API_BASE_URL}/blogs/search`, {
                method: 'GET',
                params: { q: query },
                credentials: 'include', // Include cookies if necessary
            });
            posts.value = data.value;
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
