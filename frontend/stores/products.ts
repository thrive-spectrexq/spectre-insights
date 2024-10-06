import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    reviews: string[];
}

export const useProductsStore = defineStore('products', () => {
    const products = ref<Product[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchProducts = async () => {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await useFetch(`${process.env.API_BASE_URL}/products`, {
                method: 'GET',
                credentials: 'include', // Include cookies if necessary
            });
            products.value = data.value; // Access the reactive reference
        } catch (err: any) {
            error.value = err.value?.data?.message || 'Failed to fetch products';
        } finally {
            loading.value = false;
        }
    };

    return {
        products,
        loading,
        error,
        fetchProducts,
    };
});
